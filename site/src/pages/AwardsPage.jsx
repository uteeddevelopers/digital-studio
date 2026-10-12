import { PageIntro, SourceLink } from '../components/PageIntro.jsx';
import { officialUrl } from '../data/profile.js';
import { awards, researchGrants } from '../data/awards.js';

export function AwardsPage() {
  return (
    <div>
      <PageIntro eyebrow="AWARDS & GRANTS" title="수상과 연구비" description={`수상 ${awards.length}건과 연구비 ${researchGrants.length}건을 공식 페이지의 두 범주로 구분했습니다.`} />
      <div className="awards-layout">
        <section className="award-group">
          <div className="section-heading-row"><div><p className="section-kicker">RECOGNITION</p><h2 className="section-title">수상</h2></div><span className="section-count">{awards.length}</span></div>
          <ol className="award-list">{awards.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>
        <section className="award-group grant-group">
          <div className="section-heading-row"><div><p className="section-kicker">RESEARCH SUPPORT</p><h2 className="section-title">연구비</h2></div><span className="section-count">{researchGrants.length}</span></div>
          <ol className="award-list">{researchGrants.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>
        <SourceLink href={officialUrl} />
      </div>
    </div>
  );
}
