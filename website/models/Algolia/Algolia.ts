import { AlgoliaActivity } from "@models/Activities/Activity";

export interface AlgoliaBase {
  nbHits: number;
  page: number;
  hitsPerPage: number;
  nbPages: number;
  processingTimeMS: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  facets?: { [facetKey: string]: { [facet: string]: number } };
  facets_stats?: facetStats;
}

export interface facetStats {
  minPrice: facetStat;
}

export interface facetStat {
  min: number;
  max: number;
  avg: number;
  sum: number;
}

export interface AlgoliaSearchResponse extends AlgoliaBase {
  hits: AlgoliaActivity[];
}
