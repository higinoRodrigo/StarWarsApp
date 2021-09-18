/* eslint-disable @typescript-eslint/naming-convention */
interface Personagens {
  name: string;
}

export interface StarWars{
  imgs: string;
  url: string;
  title: string;
  director: string;
  release_date: string;
  episode_id: number;
  opening_crawl: string;
  results: any[];
  showCard: boolean;
  personagens: Personagens[];
}
