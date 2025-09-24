import { useParams } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Product Details</h1>
      <p>Product ID: {params.id}</p>
    </div>
  );
}
