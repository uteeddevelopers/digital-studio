const menuItems = [
  ['profile', '프로필'],
  ['interests', '관심분야'],
  ['publications', '논문과 저서'],
  ['awards', '수상과 연구비'],
  ['alumni', '제자 진출'],
];

export function SiteHeader({ currentRoute }) {
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a className="brand-lockup" href="#profile" aria-label="최정혜 교수 홈페이지, 프로필">
          <span className="brand-name">최정혜</span>
          <span className="brand-affiliation">연세대학교 경영대학</span>
        </a>
        <nav className="primary-nav" aria-label="주요 메뉴">
          <ul className="nav-list">
            {menuItems.map(([route, label]) => (
              <li key={route}>
                <a
                  className={`menu-link ${currentRoute === route ? 'is-current' : ''}`}
                  href={`#${route}`}
                  aria-current={currentRoute === route ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="header-contact" href="mailto:jeonghye@yonsei.ac.kr">이메일</a>
      </div>
    </header>
  );
}
