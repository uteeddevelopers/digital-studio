import { useEffect, useState } from 'react';
import { SiteHeader } from './components/SiteHeader.jsx';
import { AlumniPage } from './pages/AlumniPage.jsx';
import { AwardsPage } from './pages/AwardsPage.jsx';
import { InterestsPage } from './pages/InterestsPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { PublicationsPage } from './pages/PublicationsPage.jsx';

const routes = {
  profile: ProfilePage,
  interests: InterestsPage,
  publications: PublicationsPage,
  awards: AwardsPage,
  alumni: AlumniPage,
};

function readLocation() {
  const raw = window.location.hash.replace(/^#/, '');
  const [route, query = ''] = raw.split('?');
  const params = new URLSearchParams(query);
  return { route, page: Number(params.get('page')) || 1 };
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
        <Page initialPage={location.page} />
      </main>
      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <span>최정혜 교수 · 연세대학교 경영대학</span>
          <a href="mailto:jeonghye@yonsei.ac.kr">jeonghye@yonsei.ac.kr</a>
        </div>
      </footer>
    </>
  );
}
