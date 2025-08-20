import React from 'react';
import { PawPrint, Droplets, Mountain, Calendar } from 'lucide-react';
import type { DataLayer } from '@/types/map';
import { Checkbox } from '@/components/UI/CheckBox';

interface LayerControlsProps {
  layers: DataLayer[];
  activeLayerType: string;
  onLayerToggle: (layerId: string) => void;
  onLayerTypeChange: (type: string) => void;
}

const layerIcons = {
  species: PawPrint,
  water: Droplets,
  soil: Mountain,
  events: Calendar,
};

export const LayerControls: React.FC<LayerControlsProps> = ({
  layers,
  activeLayerType,
  onLayerToggle,
  onLayerTypeChange,
}) => {
  return (
    <div className="layer-controls">
      <h3 className="legend-title">Map Data Layers</h3>

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

      <div>
        {layers.map((layer) => (
          <div key={layer.id} className="layer-item">
            <Checkbox
              id={layer.id}
              checked={layer.visible}
              onChange={() => onLayerToggle(layer.id)}
            />
            <div className="layer-info">
              <div className="layer-name">{layer.name}</div>
              <div className="layer-description">{layer.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
