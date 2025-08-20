export interface MapPoint {
    id: string;
    lat: number;
    lng: number;
    type: 'landmark' | 'animal' | 'insect' | 'plant';
    name: string;
    description?: string;
}

export interface MapArea {
    id: string;
    name: string;
    type: 'species' | 'water' | 'soil';
    coordinates: [number, number][];
    color: string;
    opacity: number;
}

export interface DataLayer {
    id: string;
    name: string;
    description: string;
    visible: boolean;
    type: 'species' | 'water' | 'soil' | 'events';
}

export interface MapState {
    center: [number, number];
    zoom: number;
    points: MapPoint[];
    areas: MapArea[];
    layers: DataLayer[];
}