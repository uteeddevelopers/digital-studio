# 최정혜 교수 홈페이지 초안

연세대학교 경영대학 최정혜 교수 공식 자료를 바탕으로 만든 Vite + React + Tailwind CSS 정적 초안이다.

## 다시 실행하기

터미널에서 다음 명령을 순서대로 실행한다.

```bash
cd "/Users/taeholim/Documents/GitHub/digital-studio/site"
npm install
npm run dev -- --host 127.0.0.1
```

브라우저에서 [http://127.0.0.1:5173/](http://127.0.0.1:5173/)를 연다. 개발 서버가 종료되면 같은 실행 명령을 다시 실행해야 한다.

빌드 확인은 다음 명령으로 한다.

```bash
npm run build
```

## 페이지 주소

- `#profile`: 프로필
- `#interests`: 관심분야
- `#publications`: 논문과 저서
- `#awards`: 수상과 연구비
- `#alumni`: 제자 진출

논문은 `#publications?page=2`처럼 페이지 번호를 붙여 이동한다.

## 자료와 이미지

- 원자료 메모: `../materials/choi-homepage-source.md`
- 데이터: `src/data/`
- 공식 프로필 이미지 원본: `public/images/choi-jeonghye.jpg`
- 별도 캐리커처 일러스트: `public/images/choi-jeonghye-illustration.png`
- 지도: `d3-geo`와 `world-atlas` 지리 자료를 사용하며, 위치 표시는 공개된 진출 기관의 도시 대표 좌표다.
- 이미지와 사실의 출처 기록: `../materials/choi-homepage-source.md`

`materials/`의 비공개 자료는 공개 사이트 폴더에 복사하지 않는다. 현재 초안은 외부 배포하지 않는다.
