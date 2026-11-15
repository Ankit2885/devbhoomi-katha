import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head" style={{ minHeight: "50vh" }}>
      <div className="wrap">
        <div className="ph-ic">🙏</div>
        <h1>यह पृष्ठ नहीं मिला</h1>
        <p>शायद यह कथा हटा दी गई है या लिंक गलत है।</p>
        <p style={{ marginTop: 20 }}><Link className="btn" href="/">मुख्य पृष्ठ पर जाएँ</Link></p>
      </div>
    </section>
  );
}
