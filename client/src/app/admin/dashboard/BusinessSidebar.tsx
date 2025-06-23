import Link from "next/link";

export default function BusinessSidebar() {
  return (
    <aside className="w-64 bg-white border-r h-full p-4 space-y-4">
      <h2 className="text-lg font-bold mb-4">Business Management</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/admin/dashboard/businesses/pending" className="hover:bg-gray-100 rounded px-3 py-2">
          Pending Businesses
        </Link>
        <Link href="/admin/dashboard/businesses/approved" className="hover:bg-gray-100 rounded px-3 py-2">
          Approved Businesses
        </Link>
      </nav>
    </aside>
  );
} 