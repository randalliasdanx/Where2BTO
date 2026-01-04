import type { Point } from 'geojson'

export enum LocationType {
    Park = "park",
    School = "school",
    BusStop = "bus-stop",
    TrainStation = "train-station",
    Residential = "residential"
}

export interface Location {
    id: string 
    name: string 
    type: LocationType
    geometry: Point
    validFrom?: Date
    validUntil?: Date
}

export interface LayerConfig {
    type: LocationType
    visible: boolean
    color: string
    icon ?: string
}