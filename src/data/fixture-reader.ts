// This file is an aggregator for fixture data, located in the adjacent fixtures directory
import type { FeatureCollection } from '../types/geometry'

export const fixtureList = Object.keys(
  import.meta.glob('/public/fixtures/*.geojson', { eager: false })
).map((path) => path.replace('/public', ''))

export class FixtureReader {
  static async collections(): Promise<FeatureCollection[]> {
    const featureCollections = await Promise.all(
      fixtureList.map(async (path) => {
        const res = await fetch(path)
        if (!res.ok) throw new Error(`Failed to load ${path}`)
        return (await res.json()) as FeatureCollection
      })
    )
    return featureCollections
  }
}
