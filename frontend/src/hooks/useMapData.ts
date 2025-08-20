import { useState, useCallback } from 'react';
import type { MapPoint, MapArea, DataLayer } from '@/types/map';
import { mockPoints, mockAreas, mockLayers } from '@/data/mockData';

export const useMapData = () => {
    const [points] = useState<MapPoint[]>(mockPoints);
    const [areas] = useState<MapArea[]>(mockAreas);
    const [layers, setLayers] = useState<DataLayer[]>(mockLayers);
    const [activeLayerType, setActiveLayerType] = useState<string>('species');

    const toggleLayer = useCallback((layerId: string) => {
        setLayers(prev => prev.map(layer =>
            layer.id === layerId
                ? { ...layer, visible: !layer.visible }
                : layer
        ));
    }, []);

    const visiblePoints = points.filter(point => {
        const relevantLayer = layers.find(layer => {
            switch (point.type) {
                case 'animal':
                case 'insect':
                case 'plant':
                    return layer.type === 'species' && layer.visible;
                case 'landmark':
                    return layer.type === 'events' && layer.visible;
                default:
                    return true;
            }
        });
        return relevantLayer || point.type === 'landmark';
    });

    const visibleAreas = areas.filter(area => {
        const relevantLayer = layers.find(layer =>
            layer.type === area.type && layer.visible
        );
        return !!relevantLayer;
    });

    return {
        points: visiblePoints,
        areas: visibleAreas,
        layers,
        activeLayerType,
        setActiveLayerType,
        toggleLayer
    };
};