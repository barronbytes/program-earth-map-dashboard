import { type JSX } from 'react';
import { Header } from '@/components/Layout/Header';
import { MapContainer } from '@/components/Map/MapContainer';
import { MapLegend } from '@/components/Map/MapLegend';
import { LayerControls } from '@/components/Map/LayerControls';
import { useMapData } from '@/hooks/useMapData';
import { Box } from '@mui/material';
import '@/styles/globals.css';
import '@/styles/map.css';

/**
 * Main application component that composes the entire UI
 * Manages the map state and renders the map with its controls
 * @component
 * @returns {JSX.Element} The complete application layout with header and map interface
 */
function App(): JSX.Element {
  const {
    points,
    areas,
    layers,
    activeLayerType,
    setActiveLayerType,
    toggleLayer,
  } = useMapData();

  return (
    <Box 
      className="app-container"
      sx={{
        margin: 1, // 1 = 10px (MUI spacing scale)
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Header />
      <Box
        component="main"
        className="main-content"
        sx={{ 
          flex: 1, 
          position: 'relative', 
          overflow: 'hidden' 
        }}
      >
        <MapContainer points={points} areas={areas} />
        <MapLegend />
        <LayerControls
          layers={layers}
          activeLayerType={activeLayerType}
          onLayerToggle={toggleLayer}
          onLayerTypeChange={setActiveLayerType}
        />
      </Box>
    </Box>
  );
}

export default App;
