import React, { type JSX } from 'react';
import { Box, Container, Typography, type TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for legend subtitles
const LegendSubtitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '14px',
  fontWeight: 600,
  color: '#33495e',
  '.dark &': {
    color: '#cbd5e1',
  },
}));

/**
 * Legend component that explains the map's symbols and colors
 * @component
 * @returns {JSX.Element} A panel showing the map legend with point and area type descriptions
 */
export const MapLegend: React.FC = (): JSX.Element => {
  return (
    <Container 
      className="map-legend"
      maxWidth={false}
      sx={{
        maxWidth: '300px',
        position: 'absolute',
        top: '20px',
        left: '20px',
        padding: '24px',
        zIndex: 1000,
      }}
    >
      <Box
        className="legend-section"
        sx={{
          mb: 2.5, // 1 = 8px (MUI spacing) → so 2.5 ≈ 20px
          '&:last-child': {
            mb: 0
          }
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
          Legend
        </Typography>

        <Box className="legend-subsection">
          <LegendSubtitle
            component="h4"
            className="legend-subtitle"
          >
            Points
          </LegendSubtitle>
          <Box className="legend-items">
            <Box className="legend-item">
              <Box className="legend-icon landmark"></Box>
              <span>Landmark</span>
            </Box>
            <Box className="legend-item">
              <Box className="legend-icon animal"></Box>
              <span>Animals</span>
            </Box>
            <Box className="legend-item">
              <Box className="legend-icon insect"></Box>
              <span>Insect</span>
            </Box>
            <Box className="legend-item">
              <Box className="legend-icon plant"></Box>
              <span>Plants</span>
            </Box>
          </Box>
        </Box>

        <Box>
          <LegendSubtitle 
            component="h4"
            className="legend-subtitle"
          >
            Areas
          </LegendSubtitle>
          <Box className="legend-items">
            <Box className="area-legend-item">
              <Box className="area-legend-icon area-legend-icon--species"></Box>
              <span>Species</span>
            </Box>
            <Box className="area-legend-item">
              <Box className="area-legend-icon area-legend-icon--water"></Box>
              <span>Water Bodies</span>
            </Box>
            <Box className="area-legend-item">
              <Box className="area-legend-icon area-legend-icon--soil"></Box>
              <span>Soil</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
