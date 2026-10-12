import { geoInterpolate, geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { origin } from '../data/alumni.js';

const width = 1040;
const height = 560;
const world = {
  type: 'FeatureCollection',
  features: feature(worldAtlas, worldAtlas.objects.countries).features.filter((item) => String(item.id).padStart(3, '0') !== '010'),
};

const unitProjection = geoNaturalEarth1()
  .rotate([-origin.coordinates[0], 0])
  .scale(1)
  .translate([0, 0]);
const [[minX, minY], [maxX, maxY]] = geoPath(unitProjection).bounds(world);
const originUnit = unitProjection(origin.coordinates);
const radiusX = Math.max(originUnit[0] - minX, maxX - originUnit[0]);
const radiusY = Math.max(originUnit[1] - minY, maxY - originUnit[1]);
const scale = Math.min((width - 76) / (radiusX * 2), (height - 58) / (radiusY * 2));
const projection = geoNaturalEarth1()
  .rotate([-origin.coordinates[0], 0])
  .scale(scale)
  .translate([width / 2 - originUnit[0] * scale, height / 2 - originUnit[1] * scale]);
const path = geoPath(projection);
const originPoint = projection(origin.coordinates);

function routeFor(location) {
  const interpolate = geoInterpolate(origin.coordinates, location.coordinates);
  const coordinates = Array.from({ length: 49 }, (_, index) => interpolate(index / 48));
  return path({ type: 'LineString', coordinates });
}

export function WorldMap({ locations, selectedId, hoveredId, onSelect, onHover }) {
  const includesSeoul = locations.some((location) => location.id === 'seoul');

  return (
    <svg className="world-map" viewBox={`0 0 ${width} ${height}`} role="group" aria-label="서울에서 제자 진출 도시로 이어지는 세계 지도">
      <title>서울을 기준으로 표시한 제자 진출 도시</title>
      <g className="map-land" aria-hidden="true">
        {world.features.map((country) => <path key={country.id ?? country.properties.name} d={path(country)} />)}
      </g>
      <g className="map-routes" aria-hidden="true">
        {locations.filter((location) => location.id !== 'seoul').map((location) => (
          <path className="map-route" key={location.id} d={routeFor(location)} />
        ))}
      </g>
      {!includesSeoul && (
        <g className="map-origin" transform={`translate(${originPoint[0]} ${originPoint[1]})`} aria-hidden="true">
          <circle className="map-origin-ring" r="8" />
          <circle className="map-origin-dot" r="3" />
          <text className="map-origin-label" x="-12" y="19" textAnchor="end">서울 출발</text>
        </g>
      )}
      <g className="map-markers">
        {locations.map((location) => {
          const point = projection(location.coordinates);
          const active = hoveredId === location.id || selectedId === location.id;
          const color = location.destinations[0]?.color || '#2867c7';
          const isOrigin = location.id === 'seoul';
          const [dx, dy] = location.labelOffset;
          return (
            <g
              className={`map-marker ${active ? 'is-active' : ''} ${isOrigin ? 'is-origin' : ''}`}
              key={location.id}
              transform={`translate(${point[0]} ${point[1]})`}
              role="button"
              tabIndex="0"
              aria-label={`${location.city}, ${location.country}. ${location.destinations.map((destination) => `${destination.name}: ${destination.people.join(', ')}`).join('; ')}`}
              aria-pressed={selectedId === location.id}
              onClick={() => onSelect(location.id)}
              onMouseEnter={() => onHover(location.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(location.id)}
              onBlur={() => onHover(null)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(location.id);
                }
              }}
            >
              <circle className="map-marker-hit" r="14" />
              {isOrigin && <circle className="map-origin-ring" r="8" />}
              <circle className="map-marker-dot" r={active ? 5 : 4} style={{ '--pin-color': color }} />
              <path className="map-label-leader" d={`M0 0 L${dx * 0.62} ${dy * 0.62}`} />
              <text className="map-label" x={dx} y={dy} textAnchor={location.labelAnchor || 'start'}>
                {isOrigin ? '서울' : location.city}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
