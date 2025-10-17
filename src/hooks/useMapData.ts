import { useState, useCallback } from 'react';
import type { FeatureCollection } from 'geojson'
// import type { MapPoint, MapArea, DataLayer } from '@/types/map';
// import { mockPoints, mockAreas, mockLayers } from '@/data/mockData';

/**
 * Custom hook for managing map data state and layer visibility
 * @returns {Object} Map data state and functions
 * @property {MapPoint[]} points - Currently visible map points filtered by active layers
 * @property {MapArea[]} areas - Currently visible map areas filtered by active layers
 * @property {DataLayer[]} layers - All available data layers
 * @property {string} activeLayerType - Currently selected layer type
 * @property {(type: string) => void} setActiveLayerType - Function to change active layer type
 * @property {(layerId: string) => void} toggleLayer - Function to toggle layer visibility
 */

export const useMapData = (collections: FeatureCollection[]) => {
    // Static data: All map points
    // const [points] = useState<MapPoint[]>(mockPoints);
    // Static data: All map areas
    // const [areas] = useState<MapArea[]>(mockAreas);
    // Dynamic data: List of all data layers with their visibility

    const [layers, setLayers] = useState<FeatureCollection[]>(collections);
    // Currently selected layer type (e.g. 'species', 'events')
    const [activeLayerType, setActiveLayerType] = useState<string>('species');
    // Error state for debugging
    const [error, setError] = useState<string | null>(null);

    /**
     * Toggle visibility of a data layer by ID
     * Updates the 'visible' property of the matching layer
     */
    const toggleLayer = useCallback((layerId: string) => {
        try {
            setLayers(prev => {
                const layerExists = prev.some(layer => layer.id === layerId);
                if (!layerExists) {
                    setError(`Layer with ID '${layerId}' not found`);
                    return prev;
                }
                setError(null);
                return prev.map(layer =>
                    layer.id === layerId
                        ? { ...layer, visible: !layer.visible }
                        : layer
                );
            });
        } catch (err) {
            setError(`Error toggling layer: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    }, []);

    /**
     * Filter visible points based on active layers
     * Only points whose type corresponds to a visible layer are shown
     */
    /*
    const visiblePoints = points.filter(point => {
        const relevantLayer = layers.find(layer => {
            switch (point.type) {
                case 'animal':
                case 'insect':
                case 'plant':
                    // Match species-related layers that are currently visible
                    return layer.type === 'species' && layer.visible;
                case 'landmark':
                    // Match event layers for landmarks
                    return layer.type === 'events' && layer.visible;
                default:
                    // Show all other types by default
                    return true;
            }
        });
        // Always show landmarks (fallback), or points with matching visible layers
        return relevantLayer || point.type === 'landmark';
    });
    */

    /**
     * Filter visible areas based on active layers
     * An area is shown only if its layer type is visible
     */
    /*
    const visibleAreas = areas.filter(area => {
        const relevantLayer = layers.find(layer =>
            layer.type === area.type && layer.visible
        );

        // Include only if there's a visible matching layer
        return !!relevantLayer;
    });
    */

    // Return the filtered data and state-modifying functions
    return {
        points: visiblePoints,
        areas: visibleAreas,
        layers,
        activeLayerType,
        setActiveLayerType,
        toggleLayer,
        error
    };
};