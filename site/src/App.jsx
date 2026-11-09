import { useEffect, useState } from 'react';
import { SiteHeader } from './components/SiteHeader.jsx';
import { AlumniPage } from './pages/AlumniPage.jsx';
import { AwardsPage } from './pages/AwardsPage.jsx';
import { BlogPage } from './pages/BlogPage.jsx';
import { InterestsPage } from './pages/InterestsPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { PublicationsPage } from './pages/PublicationsPage.jsx';
import { findBlogPost } from './data/blogPosts.js';

const routes = {
  profile: ProfilePage,
  interests: InterestsPage,
  publications: PublicationsPage,
  awards: AwardsPage,
  alumni: AlumniPage,
  blog: BlogPage,
};

function readLocation() {
  const raw = window.location.hash.replace(/^#/, '');
  // 일부 소셜 앱은 해시를 인코딩하므로 해시 없는 글 주소도 허용한다.
  if (!raw) {
    const article = new URLSearchParams(window.location.search).get('article');
    if (article && findBlogPost(article)) return { route: 'blog', page: 1, article };
  }
  const [route, query = ''] = raw.split('?');
  const params = new URLSearchParams(query);
  return { route, page: Number(params.get('page')) || 1, article: params.get('article') || '' };
}

export default function App() {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const handleHashChange = () => {
      const next = readLocation();
      if (!routes[next.route]) {
        window.history.replaceState(null, '', '#profile');
        setLocation({ route: 'profile', page: 1 });
      } else {
        setLocation(next);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    if (!routes[location.route]) {
      window.history.replaceState(null, '', '#profile');
      setLocation({ route: 'profile', page: 1 });
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const post = location.route === 'blog' ? findBlogPost(location.article) : undefined;
    document.title = post ? `${post.title} | 최정혜 연구 블로그` : '최정혜 | 연세대학교 경영대학';
    document.querySelector('meta[name="description"]')?.setAttribute('content', post?.summary || '연세대학교 경영대학 최정혜 교수의 연구와 교육 활동');
    const existingDate = document.head.querySelector('meta[property="article:published_time"]');
    if (post?.publishedAt) {
      const date = existingDate || document.createElement('meta');
      date.setAttribute('property', 'article:published_time');
      date.setAttribute('content', post.publishedAt);
      if (!existingDate) document.head.appendChild(date);
    } else {
      existingDate?.remove();
    }
  }, [location.route, location.article]);

  const Page = routes[location.route] || ProfilePage;

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus({ preventScroll: true });
        }}
      >본문으로 건너뛰기</a>
      <SiteHeader currentRoute={location.route} />
      <main id="main-content" tabIndex="-1" className="page-shell page-main">
        <Page initialPage={location.page} article={location.article} />
      </main>
      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <span>최정혜 교수 · 연세대학교 경영대학</span>
          <a href="mailto:jeonghye@yonsei.ac.kr">jeonghye@yonsei.ac.kr</a>
          <a href="https://www.instagram.com/yonsei_digitalmarketing/" target="_blank" rel="noreferrer">수업 실습 Instagram ↗</a>
        </div>
      </footer>
    </>
  );
}
