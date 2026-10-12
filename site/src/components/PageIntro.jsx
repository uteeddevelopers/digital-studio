export function PageIntro({ eyebrow, title, description, count }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <div className="page-title-row">
        <h1 className="page-title">{title}</h1>
        {count ? <p className="page-count">{count}</p> : null}
      </div>
      {description ? <p className="page-description">{description}</p> : null}
    </div>
  );
}

export function SourceLink({ href }) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noreferrer">
      공식 원자료 보기
    </a>
  );
}

export function ListBlock({ title, items }) {
  return (
    <section className="content-section">
      <h2 className="section-title">{title}</h2>
      <ul className="plain-list">
        {items.map((item) => <li key={item} className="list-item">{item}</li>)}
      </ul>
    </section>
  );
}
