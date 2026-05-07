export function DashboardTable({ title, caption, columns, rows }) {
  return (
    <article className="dashboard-card dashboard-surface dashboard-table-card">
      <div className="dashboard-panel-head">
        <div>
          <h4>{title}</h4>
          {caption ? <p className="dashboard-subtitle">{caption}</p> : null}
        </div>
      </div>

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.key}>{row[column.key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="dashboard-table-empty">
                  لا توجد بيانات بعد في هذا القسم.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
