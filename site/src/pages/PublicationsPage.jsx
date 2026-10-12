import { useEffect, useMemo, useState } from 'react';
import { PageIntro, SourceLink } from '../components/PageIntro.jsx';
import { officialUrl } from '../data/profile.js';
import { books, publicationCounts, publications } from '../data/publications.js';

const pageSize = 4;

function PublicationItem({ item }) {
  return (
    <li className="publication-item">
      <div className="publication-heading">
        <h2>{item.title}</h2>
        <span className="publication-year">{item.year}</span>
      </div>
      <p className="publication-venue">{item.venue}</p>
      <a className="inline-source-link" href={item.source} target="_blank" rel="noreferrer">원문 페이지</a>
    </li>
  );
}

export function PublicationsPage({ initialPage = 1 }) {
  const maxPage = Math.ceil(publications.length / pageSize);
  const safePage = Math.min(Math.max(Number(initialPage) || 1, 1), maxPage);
  const [page, setPage] = useState(safePage);
  useEffect(() => setPage(safePage), [safePage]);
  const visible = useMemo(() => publications.slice((page - 1) * pageSize, page * pageSize), [page]);

  const movePage = (nextPage) => {
    const next = Math.min(Math.max(nextPage, 1), maxPage);
    setPage(next);
    window.location.hash = `#publications?page=${next}`;
  };

  return (
    <div>
      <PageIntro
        eyebrow="PUBLICATIONS"
        title="논문과 저서"
        description={`논문 ${publicationCounts.papers}편과 저서·기타 출판물 ${publicationCounts.books}건을 원문 분류와 표기대로 보존했습니다.`}
        count={`SSCI ${publicationCounts.ssci}편 · KCI ${publicationCounts.kci}편`}
      />

      <section className="content-section publications-section">
        <div className="section-heading-row">
          <div><p className="section-kicker">RESEARCH ARCHIVE</p><h2 className="section-title">논문 목록</h2></div>
          <p className="page-total">현재 {visible.length}편 표시 · 전체 {publications.length}편</p>
        </div>
        <ol className="publication-list">
          {visible.map((item) => <PublicationItem key={`${item.category}-${item.title}`} item={item} />)}
        </ol>
        <nav className="pagination" aria-label="논문 페이지 이동">
          <button className="page-button page-step" type="button" onClick={() => movePage(page - 1)} disabled={page === 1}>이전</button>
          {Array.from({ length: maxPage }, (_, index) => index + 1).map((number) => (
            <button
              className={`page-button page-number ${page === number ? 'is-selected' : ''}`}
              type="button"
              key={number}
              onClick={() => movePage(number)}
              aria-current={page === number ? 'page' : undefined}
            >
              {number}
            </button>
          ))}
          <button className="page-button page-step" type="button" onClick={() => movePage(page + 1)} disabled={page === maxPage}>다음</button>
        </nav>
      </section>

      <section className="content-section books-section">
        <div className="section-heading-row"><div><p className="section-kicker">BOOKS & CHAPTERS</p><h2 className="section-title">저서와 기타 출판물</h2></div><span className="section-count">{books.length}</span></div>
        <ol className="publication-list">
          {books.map((book) => (
            <li className="publication-item" key={book.title}>
              <h3>{book.title}</h3>
              <p className="publication-venue">{book.authors}, {book.publisher}, {book.year}</p>
              {book.link ? <a className="inline-source-link" href={book.link} target="_blank" rel="noreferrer">원문 링크</a> : null}
            </li>
          ))}
        </ol>
      </section>

      <SourceLink href={officialUrl} />
    </div>
  );
}
