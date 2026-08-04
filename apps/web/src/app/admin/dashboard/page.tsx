import AdminLayout from "@/src/components/admin/AdminLayout";
import DashboardHome from "@/src/components/admin/DashboardHome";

export default function Page() {
  return (
    <AdminLayout>
      <DashboardHome />
    </AdminLayout>
  );
}