import AdminLayout from "@/src/components/admin/AdminLayout";

import EditPosts from "@/src/components/admin/editPost";

export default function Page() {
  return (
    <AdminLayout>
      <EditPosts />
    </AdminLayout>
  );
}