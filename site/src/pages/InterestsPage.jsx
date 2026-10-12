import { PageIntro, SourceLink } from '../components/PageIntro.jsx';
import { officialUrl } from '../data/profile.js';

const teaching = [
  '학부: 디지털 마케팅 전략 및 응용, 마케팅 전략 모형(신상품수요예측), 시장조사론, 마케팅원론',
  '석박사: 디지털 마케팅 세미나',
  'EMBA: 디지털 마케팅',
];

const research = [
  '디지털 마케팅, 유통/물류, 스타트업, 플랫폼, 콘텐츠 (OTT, 게임)',
  '헬스케어, 건기식/OTC, 펫케어, ESG, 공공정책 효과분석, 현장실험',
  '빅데이터분석, 텍스트분석, 이미지분석, 로그데이터분석, AI/GenAI',
];

function InterestList({ title, items }) {
  return (
    <section className="content-section interest-section">
      <h2 className="section-title">{title}</h2>
      <ul className="interest-list">
        {items.map((item) => <li key={item} className="list-item">{item}</li>)}
      </ul>
    </section>
  );
}

export function InterestsPage() {
  return (
    <div>
      <PageIntro eyebrow="INTERESTS" title="관심분야" description="강의와 연구에서 다루는 분야를 공식 페이지 표기대로 정리했습니다." />
      <div className="interest-layout">
        <InterestList title="강의관심분야" items={teaching} />
        <InterestList title="연구관심분야" items={research} />
        <SourceLink href={officialUrl} />
      </div>
    </div>
  );
}
