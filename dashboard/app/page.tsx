import React from 'react';
import BeerSection from './components/BeerSection';
import Layout from './components/Layout';
import { ActiveBeer, BeerMetadata } from './types';

const mockBeerMetadata: BeerMetadata[] = [
  {
    brand: "Mountain Culture",
    name: "Status Quo Pale Ale",
    abv: 5.2,
    description: "A crisp and refreshing pale ale with a perfect balance of malt and hops."
  },
  {
    brand: "Coastal Brews",
    name: "Ocean Breeze Lager",
    abv: 4.8,
    description: "Light and smooth lager with subtle notes of citrus, perfect for a day at the beach."
  },
  {
    brand: "Urban Hops",
    name: "City Nights IPA",
    abv: 6.5,
    description: "Bold and hoppy IPA with tropical fruit flavors and a strong bitter finish."
  },
  {
    brand: "Countryside Ales",
    name: "Harvest Moon Wheat Beer",
    abv: 5.0,
    description: "Smooth wheat beer with hints of banana and clove, inspired by traditional Bavarian styles."
  },
  {
    brand: "Peak Brewers",
    name: "Summit Stout",
    abv: 7.2,
    description: "Rich and full-bodied stout with deep roasted flavors and a hint of dark chocolate."
  }
];

const mockActiveBeerData: ActiveBeer[] = [
  {
    brand: "Mountain Culture",
    name: "Status Quo Pale Ale",
    abv: 5.2,
    description: "A crisp and refreshing pale ale with a perfect balance of malt and hops.",
    fillLevel: 75,
    temperature: 4
  },
  {
    brand: "Coastal Brews",
    name: "Ocean Breeze Lager",
    abv: 4.8,
    description: "Light and smooth lager with subtle notes of citrus, perfect for a day at the beach.",
    fillLevel: 60,
    temperature: 3
  },
  {
    brand: "Urban Hops",
    name: "City Nights IPA",
    abv: 6.5,
    description: "Bold and hoppy IPA with tropical fruit flavors and a strong bitter finish.",
    fillLevel: 90,
    temperature: 5
  },
  {
    brand: "Countryside Ales",
    name: "Harvest Moon Wheat Beer",
    abv: 5.0,
    description: "Smooth wheat beer with hints of banana and clove, inspired by traditional Bavarian styles.",
    fillLevel: 45
  },
  {
    brand: "Peak Brewers",
    name: "Summit Stout",
    abv: 7.2,
    description: "Rich and full-bodied stout with deep roasted flavors and a hint of dark chocolate.",
    temperature: 8
  }
];


const Home: React.FC = () => {

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">On Tap</h1>
      <BeerSection beers={mockActiveBeerData} isActiveBeer />
      <h1 className="text-4xl font-bold mb-8">Previous Beers</h1>
      <BeerSection beers={mockBeerMetadata} />
    </Layout>
  );
};

export default Home;
