"use client"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

interface Business {
  _id: string;
  name: string;
  ownerName: string;
  email: string;
  company: string;
  status: string;
}

export default function BusinessesLandingPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/v1/admin/businesses");
        setBusinesses(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load businesses.");
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  const handleApprove = async (id: string) => {
    setApproving(id);
    try {
      await axios.patch(`/api/v1/admin/businesses/${id}/status`, { status: "active" });
      setBusinesses((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "active" } : b))
      );
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to approve business.");
    } finally {
      setApproving(null);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  const pendingBusinesses = businesses.filter((b) => b.status === "pending");
  const approvedBusinesses = businesses.filter((b) => b.status === "active");

  return (
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-2xl font-bold mb-4">Pending Businesses</h1>
        {pendingBusinesses.length === 0 ? (
          <p>No pending businesses.</p>
        ) : (
          <table className="min-w-full border mb-8">
            <thead>
              <tr>
                <th className="border px-4 py-2">Business Name</th>
                <th className="border px-4 py-2">Owner</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Company</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingBusinesses.map((b) => (
                <tr key={b._id}>
                  <td className="border px-4 py-2">{b.name}</td>
                  <td className="border px-4 py-2">{b.ownerName}</td>
                  <td className="border px-4 py-2">{b.email}</td>
                  <td className="border px-4 py-2">{b.company}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                      onClick={() => handleApprove(b._id)}
                      disabled={approving === b._id}
                    >
                      {approving === b._id ? "Approving..." : "Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Approved Businesses</h1>
        {approvedBusinesses.length === 0 ? (
          <p>No approved businesses.</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Business Name</th>
                <th className="border px-4 py-2">Owner</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Company</th>
              </tr>
            </thead>
            <tbody>
              {approvedBusinesses.map((b) => (
                <tr key={b._id}>
                  <td className="border px-4 py-2">{b.name}</td>
                  <td className="border px-4 py-2">{b.ownerName}</td>
                  <td className="border px-4 py-2">{b.email}</td>
                  <td className="border px-4 py-2">{b.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 