import { useState } from 'react';
import { PageIntro, SourceLink } from '../components/PageIntro.jsx';
import { officialUrl } from '../data/profile.js';
import { alumni, currentStudents, mapCategories, mapLocations } from '../data/alumni.js';
import { WorldMap } from '../components/WorldMap.jsx';

const categoryFilters = [
  { id: 'all', label: '전체' },
  ...mapCategories.map(({ id, label }) => ({ id, label })),
];
const categoryLabels = Object.fromEntries(mapCategories.map(({ id, label }) => [id, label]));
const categoryColors = Object.fromEntries(mapCategories.map(({ id, color }) => [id, color]));

function destinationsForStudent(studentName) {
  return mapLocations.flatMap((location) => location.destinations
    .filter((destination) => destination.people.includes(studentName))
    .map((destination) => ({ location, destination })));
}

export function AlumniPage() {
  const [category, setCategory] = useState('all');
  const [selectedId, setSelectedId] = useState('atlanta');
  const [hoveredId, setHoveredId] = useState(null);
  const visibleLocations = mapLocations
    .map((location) => ({
      ...location,
      destinations: location.destinations
        .filter((destination) => category === 'all' || destination.category === category)
        .map((destination) => ({ ...destination, color: categoryColors[destination.category] })),
    }))
    .filter((location) => location.destinations.length > 0);
  const selectedLocation = visibleLocations.find((location) => location.id === (hoveredId || selectedId)) || visibleLocations[0];

  const chooseCategory = (nextCategory) => {
    const nextLocations = mapLocations.filter((location) => location.destinations.some(
      (destination) => nextCategory === 'all' || destination.category === nextCategory,
    ));
    setCategory(nextCategory);
    setSelectedId(nextLocations[0]?.id || null);
    setHoveredId(null);
  };

  const chooseDestination = (locationId) => {
    setCategory('all');
    setSelectedId(locationId);
    setHoveredId(null);
  };

  return (
    <div>
      <PageIntro
        eyebrow="STUDENTS & PLACEMENTS"
        title="제자 진출"
        description={`공식 페이지에 기재된 졸업생 ${alumni.length}명과 재학생 ${currentStudents.length}명을 구분했습니다.`}
      />

      <section className="map-section" aria-labelledby="map-heading">
        <div className="map-section-heading">
          <div>
            <p className="section-kicker">GLOBAL PLACEMENTS</p>
            <h2 className="section-title" id="map-heading">진출 위치</h2>
          </div>
          <div className="map-filters" role="group" aria-label="진출 분야 필터">
            {categoryFilters.map((filter) => (
              <button
                className={`map-filter ${category === filter.id ? 'is-active' : ''}`}
                key={filter.id}
                type="button"
                onClick={() => chooseCategory(filter.id)}
                aria-pressed={category === filter.id}
                style={{ '--filter-color': categoryColors[filter.id] || '#1a2f50' }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <p className="map-scope-note">핀은 공개된 진출 기관의 도시 대표 좌표입니다. 개인의 거주지나 확인되지 않은 실제 근무 캠퍼스를 뜻하지 않습니다. 서울에서 각 도시까지의 곡선은 위치를 잇는 시각 안내입니다.</p>

        <div className="map-layout">
          <div className="map-visual">
            <WorldMap
              locations={visibleLocations}
              selectedId={selectedLocation?.id}
              hoveredId={hoveredId}
              onSelect={setSelectedId}
              onHover={setHoveredId}
            />
            <div className="map-place-index" role="group" aria-label="표시 도시 선택">
              {visibleLocations.map((location) => (
                <button
                  className={`place-chip ${selectedLocation?.id === location.id ? 'is-selected' : ''}`}
                  key={location.id}
                  type="button"
                  onClick={() => setSelectedId(location.id)}
                  onMouseEnter={() => setHoveredId(location.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(location.id)}
                  onBlur={() => setHoveredId(null)}
                  aria-pressed={selectedLocation?.id === location.id}
                >
                  <span className="place-dot" style={{ '--pin-color': location.destinations[0]?.color }} />
                  {location.city}
                </button>
              ))}
            </div>
          </div>

          <aside className="map-details" aria-live="polite" aria-label="선택한 진출 위치">
            {selectedLocation ? (
              <>
                <p className="section-kicker">SELECTED LOCATION</p>
                <h3>{selectedLocation.city}</h3>
                <p className="location-country">{selectedLocation.country}</p>
                <ul className="destination-list">
                  {selectedLocation.destinations.map((destination) => (
                    <li className="destination-entry" key={`${destination.name}-${destination.people.join('-')}`}>
                      <span className="destination-category" style={{ '--pin-color': destination.color }}>{categoryLabels[destination.category]}</span>
                      <h4>{destination.name}</h4>
                      <p>{destination.people.join(' · ')}</p>
                      <div className="location-sources">
                        <a href={destination.source} target="_blank" rel="noreferrer">기관 위치 출처</a>
                        <a href={selectedLocation.coordinateSource} target="_blank" rel="noreferrer">도시 좌표 출처</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : <p className="empty-location">선택한 분류에 표시할 위치가 없습니다.</p>}
          </aside>
        </div>
      </section>

      <section className="content-section alumni-section">
        <div className="section-heading-row">
          <div><p className="section-kicker">ALUMNI</p><h2 className="section-title">졸업생</h2></div>
          <span className="section-count">{alumni.length}명</span>
        </div>
        <ul className="alumni-grid">
          {alumni.map((student, index) => {
            const destinations = destinationsForStudent(student.name);
            const isRelated = destinations.some(({ location }) => location.id === selectedLocation?.id);
            return (
              <li className={`alumni-person ${isRelated ? 'is-related' : ''}`} key={student.name}>
                <div className="alumni-person-heading">
                  <span className="alumni-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{student.name}</h3>
                </div>
                <p className="alumni-detail">{student.detail}</p>
                {destinations.length > 0 && (
                  <div className="student-place-links" aria-label={`${student.name}의 진출 위치`}>
                    {destinations.map(({ location, destination }) => (
                      <button className="student-place-link" key={`${location.id}-${destination.name}`} type="button" onClick={() => chooseDestination(location.id)}>
                        {location.city}<span aria-hidden="true"> ↗</span>
                      </button>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="content-section current-students-section">
        <div className="section-heading-row">
          <div><p className="section-kicker">CURRENT STUDENTS</p><h2 className="section-title">재학생</h2></div>
          <span className="section-count">{currentStudents.length}명</span>
        </div>
        <ul className="current-students-list">
          {currentStudents.map((student) => <li key={student}>{student}</li>)}
        </ul>
      </section>

      <SourceLink href={officialUrl} />
    </div>
  );
}
