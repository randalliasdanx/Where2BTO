import { Location, LocationType } from "../types/location";

export const mockLocations: Location[] = [
    {
        id: "1", 
        name: "Qi Jia house", 
        type: LocationType.Residential,
        geometry: {
            type: "Point",
            coordinates: [103.91163805567946, 1.3220240663130078]
        },
        validFrom: new Date('2024-01-01')
    }, 
    {
        id: "2", 
        name: "Randall house", 
        type: LocationType.Residential,
        geometry: {
            type: "Point",
            coordinates: [103.82432348451464, 1.4270113301733185]
        }
    }, 
    {
        id: "3", 
        name: "Yishun MRT",
        type: LocationType.TrainStation, 
        geometry: {
            type: "Point", 
            coordinates: [103.83598118947243, 1.4295693320044784]
        }
    }, 
    {
        id: "4", 
        name: "Opp Yishun MRT",
        type: LocationType.BusStop, 
        geometry: {
            type: "Point", 
            coordinates: [103.83558735048199, 1.4287673607646663]
        }
    }, 
    {
        id: "5", 
        name: "Bishan Park",
        type: LocationType.Park, 
        geometry: {
            type: "Point",
            coordinates: [103.84417293976139, 1.3635696855943569]
        }
    },
    {
        id: "6",
        name: "Nanyang Primary School",
        type: LocationType.School,
        geometry: {
            type: "Point",
            coordinates: [103.83200, 1.42800]
        },
        validFrom: new Date('2020-01-01')
    },
    {
        id: "7",
        name: "Ang Mo Kio Park",
        type: LocationType.Park,
        geometry: {
            type: "Point",
            coordinates: [103.84500, 1.37000]
        }
    },
    {
        id: "8",
        name: "Future Development Site",
        type: LocationType.Residential,
        geometry: {
            type: "Point",
            coordinates: [103.85000, 1.38000]
        },
        validFrom: new Date('2027-01-01'),
        validUntil: new Date('2030-12-31')
    }
]