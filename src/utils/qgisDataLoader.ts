/**
 * Utility functions for loading and processing QGIS2Web exported data
 * This helps preserve custom attributes and styling from QGIS exports
 */

import type { MapPoint, MapArea } from '@/types/map';

/**
 * Interface for QGIS2Web exported GeoJSON feature properties
 */
interface QGISFeatureProperties {
  [key: string]: unknown;
  name?: string;
  type?: string;
  description?: string;
  // Add other custom attributes as needed
}

/**
 * Interface for QGIS2Web exported GeoJSON feature
 */
interface QGISGeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point' | 'Polygon' | 'LineString';
    coordinates: number[] | number[][];
  };
  properties: QGISFeatureProperties;
}

/**
 * Interface for QGIS2Web exported GeoJSON
 */
interface QGISGeoJSON {
  type: 'FeatureCollection';
  features: QGISGeoJSONFeature[];
}

/**
 * Configuration for QGIS data loading
 */
interface QGISDataConfig {
  pointTypeMapping: Record<string, MapPoint['type']>;
  areaTypeMapping: Record<string, MapArea['type']>;
  colorMapping: Record<string, string>;
  defaultOpacity: number;
}

/**
 * Default configuration for QGIS data loading
 */
const defaultConfig: QGISDataConfig = {
  pointTypeMapping: {
    'landmark': 'landmark',
    'animal': 'animal',
    'insect': 'insect',
    'plant': 'plant',
    'species': 'animal', // fallback for species data
  },
  areaTypeMapping: {
    'species': 'species',
    'water': 'water',
    'soil': 'soil',
    'conservation': 'species',
  },
  colorMapping: {
    'landmark': '#e74c3c',
    'animal': '#3498db',
    'insect': '#f39c12',
    'plant': '#27ae60',
    'species': '#FFD700',
    'water': '#4A90E2',
    'soil': '#8B4513',
  },
  defaultOpacity: 0.3,
};

/**
 * Converts QGIS2Web exported GeoJSON points to MapPoint format
 * @param features - Array of GeoJSON features from QGIS2Web export
 * @param config - Configuration for data mapping
 * @returns Array of MapPoint objects
 */
export const convertQGISPointsToMapPoints = (
  features: QGISGeoJSONFeature[],
  config: Partial<QGISDataConfig> = {}
): MapPoint[] => {
  const mergedConfig = { ...defaultConfig, ...config };
  
  return features
    .filter(feature => feature.geometry.type === 'Point')
    .map((feature, index) => {
      const coords = feature.geometry.coordinates as number[];
      const props = feature.properties;
      
      // Determine point type from properties or use default
      const typeKey = String(props.type || props.category || 'landmark');
      const pointType = mergedConfig.pointTypeMapping[typeKey] || 'landmark';
      
      return {
        id: String(props.id || `qgis-point-${index}`),
        lat: coords[1], // GeoJSON uses [lng, lat] format
        lng: coords[0],
        type: pointType,
        name: String(props.name || props.title || `Point ${index + 1}`),
        description: props.description || props.notes ? String(props.description || props.notes) : undefined,
      };
    });
};

/**
 * Converts QGIS2Web exported GeoJSON areas to MapArea format
 * @param features - Array of GeoJSON features from QGIS2Web export
 * @param config - Configuration for data mapping
 * @returns Array of MapArea objects
 */
export const convertQGISAreasToMapAreas = (
  features: QGISGeoJSONFeature[],
  config: Partial<QGISDataConfig> = {}
): MapArea[] => {
  const mergedConfig = { ...defaultConfig, ...config };
  
  return features
    .filter(feature => feature.geometry.type === 'Polygon')
    .map((feature, index) => {
      const coords = (feature.geometry.coordinates as unknown) as number[][][];
      const props = feature.properties;
      
      // Determine area type from properties
      const typeKey = String(props.type || props.category || 'species');
      const areaType = mergedConfig.areaTypeMapping[typeKey] || 'species';
      
      // Convert coordinates to [lat, lng] format for MapArea
      const coordinates: [number, number][] = coords[0].map(coord => [coord[1], coord[0]]);
      
      return {
        id: String(props.id || `qgis-area-${index}`),
        name: String(props.name || props.title || `Area ${index + 1}`),
        type: areaType,
        coordinates,
        color: String(props.color || mergedConfig.colorMapping[typeKey] || '#FFD700'),
        opacity: Number(props.opacity || props.fillOpacity || mergedConfig.defaultOpacity),
      };
    });
};

/**
 * Loads QGIS2Web exported data from a URL
 * @param url - URL to the GeoJSON file
 * @param config - Configuration for data mapping
 * @returns Promise with converted map data
 */
export const loadQGISData = async (
  url: string,
  config: Partial<QGISDataConfig> = {}
): Promise<{ points: MapPoint[]; areas: MapArea[] }> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load QGIS data: ${response.statusText}`);
    }
    
    const geojson: QGISGeoJSON = await response.json();
    
    const points = convertQGISPointsToMapPoints(geojson.features, config);
    const areas = convertQGISAreasToMapAreas(geojson.features, config);
    
    return { points, areas };
  } catch (error) {
    console.error('Error loading QGIS data:', error);
    throw error;
  }
};

/**
 * Loads multiple QGIS2Web exported files
 * @param urls - Array of URLs to GeoJSON files
 * @param config - Configuration for data mapping
 * @returns Promise with combined map data
 */
export const loadMultipleQGISData = async (
  urls: string[],
  config: Partial<QGISDataConfig> = {}
): Promise<{ points: MapPoint[]; areas: MapArea[] }> => {
  try {
    const results = await Promise.all(
      urls.map(url => loadQGISData(url, config))
    );
    
    // Combine all points and areas
    const allPoints = results.flatMap(result => result.points);
    const allAreas = results.flatMap(result => result.areas);
    
    return { points: allPoints, areas: allAreas };
  } catch (error) {
    console.error('Error loading multiple QGIS data files:', error);
    throw error;
  }
};

/**
 * Creates a configuration object for specific QGIS project
 * @param projectName - Name of the QGIS project
 * @param customMappings - Custom type and color mappings
 * @returns Configuration object
 */
export const createQGISConfig = (
  _projectName: string,
  customMappings: Partial<QGISDataConfig> = {}
): QGISDataConfig => {
  return {
    ...defaultConfig,
    ...customMappings,
  };
};
