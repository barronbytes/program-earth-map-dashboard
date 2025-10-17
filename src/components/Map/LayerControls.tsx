import React from 'react';
import { PawPrint, Droplets, Mountain, Calendar } from 'lucide-react';
import type { DataLayer } from '@/types/map';
import { Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';

/**
 * Props for the LayerControls component
 * @interface LayerControlsProps
 * @property {DataLayer[]} layers - Array of available map layers
 * @property {string} activeLayerType - Currently selected layer type
 * @property {(layerId: string) => void} onLayerToggle - Callback when a layer's visibility is toggled
 * @property {(type: string) => void} onLayerTypeChange - Callback when the active layer type is changed
 */
interface LayerControlsProps {
  layers: DataLayer[];
  activeLayerType: string;
  onLayerToggle: (layerId: string) => void;
  onLayerTypeChange: (type: string) => void;
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
  layers,
  activeLayerType,
  onLayerToggle,
  onLayerTypeChange,
}) => {
  return (
    <Box 
      className="layer-controls"
      sx={{
        minWidth: 250,
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 3, // same as 24px
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}
    >
      <Typography
        component="h3"
        className="legend-title"
        sx={{
          mb: 1.5, // 1 = 8px (MUI spacing) → so 1.5 ≈ 12px
          fontSize: '18px',
          fontWeight: 600,
          color: '#2c3e50', // Light mode color
          '.dark &': { color: '#f1f5f9', },
        }}
      >
        Map Data Layers
      </Typography>

      {/* Render buttons for switching active layer types (with icons) */}
      <Box 
        className="layer-icons"
          sx={{
            mb: 2.5, // 2.5 (MUI spacing) → 20px
            display: 'flex',
            gap: 2, // 2 (MUI spacing) → 16px
            justifyContent: 'center',
          }}
      >
        {Object.entries(layerIcons).map(([type, Icon]) => (
          <Button
            key={type}
            className={`layer-icon-button ${
              activeLayerType === type ? 'active' : ''
            }`}
            onClick={() => onLayerTypeChange(type)}
            variant="text"
            sx={{
              minWidth: 80,
              p: 2, // 16px
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1, // 8px
              cursor: 'pointer',
            }}
          >
            <Icon size={20} />
            <Typography 
              component="span"
              className="layer-icon-text"
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: '#5a6c7d !important',
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>
          </Button>
        ))}
      </Box>

      {/* Render MUI checkboxes for each available layer */}
      <Box>
        {layers.map((layer) => (
          <Box 
            key={layer.id} 
            className="layer-item"
            sx={{
              mb: 1, // 8px
              borderRadius: 1.5, // 12px
              p: 2, // 16px
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5, // 12px
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={layer.visible}
                  onChange={() => onLayerToggle(layer.id)}
                  color="primary"
                />
              }
              label={<Typography>{layer.name}</Typography>}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
