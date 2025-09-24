import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <main>{children}</main>
      </div>
    </div>
  );
}
