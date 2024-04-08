export interface ListCharacter {
  id?: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  created: string;
}

interface DetailCharacter {
  status: string;
  type: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

export type IntersectionCharacter = ListCharacter & DetailCharacter;
