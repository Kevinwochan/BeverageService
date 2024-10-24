export interface BeerMetadata {
    brand: string;
    name: string;
    abv: number;
    description: string;
}

export interface ActiveBeer extends BeerMetadata {
    name: string;
    abv: number;
    description: string;
    fillLevel?: number;
    temperature?: number;
}