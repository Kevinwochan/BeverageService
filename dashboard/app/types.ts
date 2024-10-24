export interface BeerMetadata {
    brand: string;
    name: string;
    abv: number;
    description: string;
    image?: string;
}

export interface ActiveBeer extends BeerMetadata {
    name: string;
    abv: number;
    description: string;
    isActive: boolean;
    image?: string;
    fillLevel?: number;
    temperature?: number;
    device_id?: string;
    location?: string
}