// components/dashboard/StatCard.jsx
export default function StatCard({ title, value, icon }) {
  return (
    <div className="card">
      <div>
        <div className="numbers">{value}</div>
        <div className="cardName">{title}</div>
      </div>
      <div className="iconBox">
        <i className={`fa ${icon}`} aria-hidden="true"></i>
      </div>
    </div>
  );
}