import Link from "next/link";

export function ProgramCard({ program }) {
  return (
    <article className="program-card">
      <div className="program-card-head">
        <span className="program-company">{program.company?.name}</span>
        <span className="program-badge">{program.flightWindow}</span>
      </div>
      <h3>{program.title}</h3>
      <p>{program.shortDescription}</p>
      <div className="program-meta-grid">
        <div>
          <span>المدة</span>
          <strong>{program.duration}</strong>
        </div>
        <div>
          <span>السعة</span>
          <strong>{program.capacity} مقعد</strong>
        </div>
        <div>
          <span>البالغ</span>
          <strong>${program.priceAdult}</strong>
        </div>
        <div>
          <span>الطفل</span>
          <strong>${program.priceChild}</strong>
        </div>
      </div>
      <div className="program-card-footer">
        <span className="program-meeting">{program.meetingPoint}</span>
        <Link className="button primary" href={`/programs/${program.slug}`}>
          عرض التفاصيل
        </Link>
      </div>
    </article>
  );
}
