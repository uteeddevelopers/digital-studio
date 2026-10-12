import { PageIntro, SourceLink } from '../components/PageIntro.jsx';
import { officialUrl, profile } from '../data/profile.js';

export function ProfilePage() {
  return (
    <div>
      <PageIntro
        eyebrow="PROFILE"
        title="프로필"
        description="최정혜 교수 · 연세대학교 경영대학 · 마케팅"
      />

      <div className="profile-feature">
        <figure className="portrait-frame">
          <img className="portrait-art" src={profile.illustration} alt="최정혜 교수의 상반신 캐리커처 일러스트" />
        </figure>
        <div className="profile-lead">
          <p className="profile-name-en">{profile.englishName}</p>
          <h2>{profile.name} {profile.title}</h2>
          <p className="profile-affiliation">{profile.affiliation} · {profile.major}</p>
          <dl className="contact-grid">
            <div><dt>연구실</dt><dd>{profile.office}</dd></div>
            <div><dt>전화</dt><dd><a href={`tel:${profile.phone}`}>{profile.phone}</a></dd></div>
            <div><dt>이메일</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
          </dl>
          <div className="education-block">
            <h3>학력</h3>
            <ul className="plain-list">
              {profile.education.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <a className="profile-source" href={profile.imageSource} target="_blank" rel="noreferrer">공식 프로필 이미지 원본</a>
        </div>
      </div>

      <section className="content-section career-section">
        <div className="section-heading-row">
          <div><p className="section-kicker">APPOINTMENTS & SERVICE</p><h2 className="section-title">주요 경력과 활동</h2></div>
          <span className="section-count">{profile.career.length}개 항목</span>
        </div>
        <ol className="career-list">
          {profile.career.map((item, index) => <li key={item}><span className="career-index">{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}
        </ol>
      </section>

      <SourceLink href={officialUrl} />
    </div>
  );
}
