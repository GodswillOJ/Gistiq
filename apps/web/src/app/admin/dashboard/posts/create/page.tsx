import AdminLayout from "@/src/components/admin/AdminLayout";
import PostEditor from "@/src/components/admin/PostEditor";

export default function Page() {
  return (
    <AdminLayout>
      <PostEditor />
    </AdminLayout>
  );
}