// Loader for any fixture data
// Should be called (probably) on app start
import { FixtureReader } from "@/data/fixture-reader";
import type { FeatureCollection } from "geojson";

async function loadFixtureData(): Promise<FeatureCollection[]> {
  return await FixtureReader.collections()
}

export { loadFixtureData }
