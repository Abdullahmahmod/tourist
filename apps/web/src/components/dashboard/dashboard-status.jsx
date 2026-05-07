export function DashboardStatus({ children, tone = "neutral" }) {
  return (
    <span className={`dashboard-status dashboard-status-${tone}`}>
      {children}
    </span>
  );
}
