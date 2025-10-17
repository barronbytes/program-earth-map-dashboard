// Some extensions to GEOJSON's types for our particular uses
import type { FeatureCollection as GJFC } from "geojson";

export interface FeatureCollection extends GJFC {
  name: string,
  crs: {
    type: string,
    properties: {
      name: string
    }
  }
}
