import Link from "next/link";

export default function BusinessesLandingPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Business Management</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/dashboard/businesses/pending" className="text-blue-600 hover:underline">
            View Pending Businesses
          </Link>
        </li>
        <li>
          <Link href="/admin/dashboard/businesses/approved" className="text-blue-600 hover:underline">
            View Approved Businesses
          </Link>
        </li>
      </ul>
    </div>
  );
} 