export function PageIntro({ eyebrow, title, english, children }: { eyebrow: string; title: string; english: string; children: React.ReactNode }) {
  return (
    <section className="page-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-english">{english}</p>
      </div>
      <p className="lead">{children}</p>
    </section>
  );
}
