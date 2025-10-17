import React from 'react';
import { PawPrint, Droplets, Mountain, Calendar } from 'lucide-react';
import { Checkbox } from '@/components/UI/CheckBox';
import type { LayerVisibilityMap } from '@/types/map';


interface LayerControlsProps {
  visibilityMap: LayerVisibilityMap,
  onLayerChange: (visibilityMap: LayerVisibilityMap) => void;
}

// Map layer types to icons for UI representation
const layerIcons = {
  species: PawPrint,
  water: Droplets,
  soil: Mountain,
  events: Calendar,
};

/**
 * A control panel component for managing map layer visibility
 * @component
 * @param {LayerControlsProps} props - The component props
 * @returns {JSX.Element} A panel with layer toggle controls and type selection buttons
 */
export const LayerControls: React.FC<LayerControlsProps> = ({
  visibilityMap,
  onLayerChange
}) => {
  return (
    <div className="layer-controls">
      <h3 className="legend-title">Map Data Layers</h3>

      {/* Render buttons for switching active layer types (with icons) */}
      {/*
        <div className="layer-icons">
        {Object.entries(layerIcons).map(([type, Icon]) => (
          <button
            key={type}
            className={`layer-icon-button ${
              activeLayerType === type ? 'active' : ''
            }`}
            onClick={() => onLayerTypeChange(type)}
          >
            <Icon size={20} />
            <span className="layer-icon-text">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </button>
        ))}
      </div>
      */}
      

      {/* Render checkboxes for each available layer */}
      <div>
        {Object.entries(visibilityMap).map(([k, v], idx) => (
          <div key={idx} className="layer-item">
            <Checkbox
              id={idx}
              checked={v}
              onChange={() => onLayerChange({...visibilityMap, [k]: !v})}
            />
            <div className="layer-info">
              <div className="layer-name">{k}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
