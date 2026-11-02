import { blogPosts, findBlogPost } from '../data/blogPosts.js';
import { PageIntro } from '../components/PageIntro.jsx';

export function BlogPage({ article }) {
  const post = findBlogPost(article);

  if (!post) {
    return (
      <div>
        <PageIntro eyebrow="RESEARCH STORIES" title="연구 블로그" description="논문을 바탕으로 마케팅에서 생각해 볼 질문을 풀어봅니다." count={`${blogPosts.length}편`} />
        <p className="blog-notice">이 글은 수업 실습을 위한 연구 소개이며 교수님의 공식 입장이 아닙니다.</p>
        <ol className="blog-list">
          {blogPosts.map((item) => (
            <li key={item.id} className="blog-list-item">
              <p className="blog-year">{item.year} 연구</p>
              <h2><a href={`#blog?article=${item.id}`}>{item.title}</a></h2>
              <p>{item.summary}</p>
              <a className="inline-source-link" href={`#blog?article=${item.id}`}>글 읽기</a>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <article className="blog-article">
      <a className="blog-back" href="#blog">← 연구 블로그 목록</a>
      <p className="eyebrow">RESEARCH STORY · {post.year}</p>
      <h1>{post.title}</h1>
      <p className="blog-summary">{post.summary}</p>
      <p className="blog-notice">수업 실습을 위한 연구 소개 글입니다. 교수님의 공식 입장이나 직접 발언이 아닙니다.</p>
      <p className="blog-question">{post.question}</p>
      {post.sections.map((section) => (
        <section className="blog-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
      <section className="blog-source">
        <h2>출처와 더 읽기</h2>
        <p>{post.citation}</p>
        <a href={post.doi} target="_blank" rel="noreferrer">논문 원문 페이지 보기</a>
      </section>
      <a className="blog-back" href="#blog">← 연구 블로그 목록으로</a>
    </article>
  );
}
