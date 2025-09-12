import React from 'react';

/**
 * Legend component that explains the map's symbols and colors
 * @component
 * @returns {JSX.Element} A panel showing the map legend with point and area type descriptions
 */
export const MapLegend: React.FC = () => {
  return (
    <div className="map-legend">
      <div className="legend-section">
        <h3 className="legend-title">Legend</h3>

        <div className="legend-subsection">
          <h4 className="legend-subtitle">
            Points
          </h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-icon landmark"></div>
              <span>Landmark</span>
            </div>
            <div className="legend-item">
              <div className="legend-icon animal"></div>
              <span>Animals</span>
            </div>
            <div className="legend-item">
              <div className="legend-icon insect"></div>
              <span>Insect</span>
            </div>
            <div className="legend-item">
              <div className="legend-icon plant"></div>
              <span>Plants</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="legend-subtitle">
            Areas
          </h4>
          <div className="legend-items">
            <div className="area-legend-item">
              <div className="area-legend-icon area-legend-icon--species"></div>
              <span>Species</span>
            </div>
            <div className="area-legend-item">
              <div className="area-legend-icon area-legend-icon--water"></div>
              <span>Water Bodies</span>
            </div>
            <div className="area-legend-item">
              <div className="area-legend-icon area-legend-icon--soil"></div>
              <span>Soil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
