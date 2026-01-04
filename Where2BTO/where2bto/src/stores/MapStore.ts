import {makeObservable, observable, action, computed} from 'mobx'
import { Location, LocationType, LayerConfig } from "../types/location"
import { mockLocations } from "../data/mockLocation"

class MapStore {
    locations: Location[] = mockLocations
    layerConfigs: LayerConfig[] = []
    selectedLocation: Location | null = null

    constructor() {
        makeObservable(this, {
            locations: observable, 
            layerConfigs: observable, 
            selectedLocation: observable,
            selectLocation: action,
            initialiseLayerConfigs: action,
            toggleLayerVisibility: action,
            visibleLocations: computed
        })
        this.initialiseLayerConfigs()
    }

    selectLocation(locationId: string | null) {
        if (locationId === null) {
            this.selectedLocation = null
        } else {
            const found = this.locations.find(loc => loc.id === locationId)
            this.selectedLocation = found || null
        }
    }

    initialiseLayerConfigs() {
        this.layerConfigs = [
          { type: LocationType.Park, visible: true, color: '#22c55e' },
          { type: LocationType.School, visible: true, color: '#3b82f6' },
          { type: LocationType.BusStop, visible: true, color: '#f59e0b' },
          { type: LocationType.TrainStation, visible: true, color: '#ef4444' },
          { type: LocationType.Residential, visible: true, color: '#8b5cf6' }
        ]
      }

      toggleLayerVisibility(type: LocationType) {
        const layer = this.layerConfigs.find(lc => lc.type === type)
        if (layer) {
            layer.visible = !layer.visible
        }
      }

      get visibleLocations(): Location[] {
        return this.locations.filter(loc => {
            const layerConfig = this.layerConfigs.find(config => config.type === loc.type)
            return layerConfig?.visible ?? true
        })
      }
}

export const mapStore = new MapStore()