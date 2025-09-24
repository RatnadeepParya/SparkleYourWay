import { useParams } from "next/navigation";

export default function OrderDetails() {
  const params = useParams();
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Order Details</h1>
      <p>Order ID: {params.id}</p>
    </div>
  );
}
