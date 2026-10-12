export const alumni = [
  { name: '이예령 (Li Yiling)', detail: '2025 박사, 고려대학교 디지털경영 교수', locations: ['sejong'] },
  { name: '정현우', detail: '2025 석사, 2025 Wharton School 마케팅 박사 진학', locations: ['philadelphia'] },
  { name: '김혜정', detail: '2024 석사, 2024 Georgia Institute of Technology 마케팅 박사 진학', locations: ['atlanta'] },
  { name: '윤여림', detail: '2023 통합, 2023 University of Minnesota 마케팅 박사 진학', locations: ['minneapolis'] },
  { name: '곽유신', detail: '2022 석사, 2022 Emory University 마케팅 박사 진학', locations: ['atlanta'] },
  { name: '윤여홍', detail: '2021 석사, 2021 Emory University 마케팅 박사 진학', locations: ['atlanta'] },
  { name: '이지연', detail: '2021 석사, 롯데면세점 입사', locations: ['seoul'] },
  { name: '송혜신', detail: '2020 석사, 2021 Georgia State University 마케팅 박사 진학', locations: ['atlanta'] },
  { name: '김상화', detail: '2019 석사, 2019 University of Maryland 마케팅 박사 진학, McMaster University 마케팅 교수', locations: ['college-park', 'hamilton'] },
  { name: '장연 (Jiang Yan)', detail: '2018 석사, 2024 University of Houston 마케팅 박사 진학', locations: ['houston'] },
  { name: '조우용', detail: '2017 석사, 2017 Emory University 마케팅 박사 진학, Purdue University 마케팅 교수', locations: ['atlanta', 'west-lafayette'] },
  { name: '김민경', detail: '2015 학사, 2017 Wharton School 마케팅 박사 진학, Ohio State University 마케팅 교수', locations: ['philadelphia', 'columbus'] },
  { name: '김지연', detail: '2014 석사, 2018 박사, La Trobe University 마케팅 교수', locations: ['melbourne'] },
];

export const currentStudents = ['김우경', '황인서', '나규원', '김정현', '오가령'];

export const mapCategories = [
  { id: 'doctoral', label: '박사 진학', color: '#2867c7' },
  { id: 'faculty', label: '교수 진출', color: '#bd663d' },
  { id: 'industry', label: '기업 진출', color: '#26765d' },
];

export const origin = {
  city: '서울',
  country: '대한민국',
  coordinates: [126.9784, 37.566],
};

export const mapLocations = [
  {
    id: 'sejong', city: '세종', coordinateQuery: 'Sejong', country: '대한민국', coordinates: [127.29223, 36.59245], labelOffset: [12, -14],
    destinations: [{ name: '고려대학교 디지털경영 교수', category: 'faculty', people: ['이예령 (Li Yiling)'], source: 'https://aisc.korea.ac.kr/digb/4256/subview.do' }],
  },
  {
    id: 'philadelphia', city: '필라델피아', coordinateQuery: 'Philadelphia', country: '미국', coordinates: [-75.16362, 39.95238], labelOffset: [32, -66],
    destinations: [{ name: 'Wharton School 박사과정', category: 'doctoral', people: ['정현우', '김민경'], source: 'https://www.wharton.upenn.edu/contact-wharton/' }],
  },
  {
    id: 'atlanta', city: '애틀랜타', coordinateQuery: 'Atlanta', country: '미국', coordinates: [-84.38798, 33.749], labelOffset: [42, 61],
    destinations: [
      { name: 'Georgia Institute of Technology 박사과정', category: 'doctoral', people: ['김혜정'], source: 'https://admission.gatech.edu/contact' },
      { name: 'Emory University 박사과정', category: 'doctoral', people: ['곽유신', '윤여홍', '조우용'], source: 'https://www.emory.edu/contacts' },
      { name: 'Georgia State University 박사과정', category: 'doctoral', people: ['송혜신'], source: 'https://www.gsu.edu/contact-georgia-state/' },
    ],
  },
  {
    id: 'minneapolis', city: '미니애폴리스', coordinateQuery: 'Minneapolis', country: '미국', coordinates: [-93.26384, 44.97997], labelOffset: [-62, -58], labelAnchor: 'end',
    destinations: [{ name: 'University of Minnesota 박사과정', category: 'doctoral', people: ['윤여림'], source: 'https://carlsonschool.umn.edu/location-facilities' }],
  },
  {
    id: 'seoul', city: '서울', coordinateQuery: 'Seoul', country: '대한민국', coordinates: [126.9784, 37.566], labelOffset: [-12, 19], labelAnchor: 'end',
    destinations: [{ name: '롯데면세점', category: 'industry', people: ['이지연'], source: 'https://eng.lottedfs.com/kr/footer/getClseInfo?clse_tp_cd=62' }],
  },
  {
    id: 'college-park', city: '칼리지파크', coordinateQuery: 'College Park', country: '미국', coordinates: [-76.93692, 38.98067], labelOffset: [68, -6],
    destinations: [{ name: 'University of Maryland 박사과정', category: 'doctoral', people: ['김상화'], source: 'https://www.registrar.umd.edu/contact-us' }],
  },
  {
    id: 'hamilton', city: '해밀턴', coordinateQuery: 'Hamilton', country: '캐나다', coordinates: [-79.84963, 43.25011], labelOffset: [-72, -100], labelAnchor: 'end',
    destinations: [{ name: 'McMaster University 마케팅 교수', category: 'faculty', people: ['김상화'], source: 'https://discover.mcmaster.ca/' }],
  },
  {
    id: 'houston', city: '휴스턴', coordinateQuery: 'Houston', country: '미국', coordinates: [-95.36327, 29.76328], labelOffset: [-54, 34], labelAnchor: 'end',
    destinations: [{ name: 'University of Houston 박사과정', category: 'doctoral', people: ['장연 (Jiang Yan)'], source: 'https://www.campusnet.uh.edu/studentcenters/about-us/directions/' }],
  },
  {
    id: 'west-lafayette', city: '웨스트라피엣', coordinateQuery: 'West Lafayette', country: '미국', coordinates: [-86.90807, 40.42587], labelOffset: [0, -127], labelAnchor: 'middle',
    destinations: [{ name: 'Purdue University 마케팅 교수', category: 'faculty', people: ['조우용'], source: 'https://www.purdue.edu/home/contact-us/' }],
  },
  {
    id: 'columbus', city: '콜럼버스', coordinateQuery: 'Columbus', country: '미국', coordinates: [-82.99879, 39.96118], labelOffset: [-39, 98], labelAnchor: 'end',
    destinations: [{ name: 'Ohio State University 마케팅 교수', category: 'faculty', people: ['김민경'], source: 'https://undergrad.osu.edu/contact-us' }],
  },
  {
    id: 'melbourne', city: '멜버른', coordinateQuery: 'Melbourne', country: '호주', coordinates: [144.96332, -37.814], labelOffset: [12, -12],
    destinations: [{ name: 'La Trobe University 마케팅 교수', category: 'faculty', people: ['김지연'], source: 'https://www.latrobe.edu.au/melbourne/contact' }],
  },
].map(({ coordinateQuery, ...location }) => ({
  ...location,
  coordinateSource: `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(coordinateQuery)}&count=1&language=en&format=json`,
}));
