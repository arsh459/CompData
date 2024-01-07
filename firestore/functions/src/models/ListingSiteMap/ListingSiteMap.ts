export interface SiteMap {
  stays: SiteMapSnippet[];
  experiences: SiteMapSnippet[];
  trips: SiteMapSnippet[];
  collections: SiteMapSnippet[];
}

export interface SiteMapSnippet {
  name: string;
  key: string;
}
