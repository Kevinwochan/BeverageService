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
    name: "Harvest Moon Wheat",
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
    name: "Harvest Moon Beer",
    abv: 5.0,
    description: "Smooth wheat beer with hints of banana and clove, inspired by traditional Bavarian styles.",
    fillLevel: 45,
    temperature: 5
  }
];


const Home: React.FC = () => {

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">On Tap 🚰</h1>
      <BeerSection beers={mockActiveBeerData} isActiveBeer />
      <h1 className="text-4xl font-bold mb-8">Previous Bevvies</h1>
      <BeerSection beers={mockBeerMetadata} />
    </Layout>
  );
};

export default Home;

/*
Here's the updated DynamoDB record format with a `device_id` attribute added and set to `-1` for each item:

```json
[
  {
    "device_id": {
      "N": "-1"
    },
    "brand": {
      "S": "Mountain Culture"
    },
    "name": {
      "S": "Status Quo Pale Ale"
    },
    "abv": {
      "N": "5.2"
    },
    "description": {
      "S": "A crisp and refreshing pale ale with a perfect balance of malt and hops."
    },
    "fillLevel": {
      "N": "75"
    },
    "temperature": {
      "N": "4"
    }
  },
  {
    "device_id": {
      "N": "-1"
    },
    "brand": {
      "S": "Coastal Brews"
    },
    "name": {
      "S": "Ocean Breeze Lager"
    },
    "abv": {
      "N": "4.8"
    },
    "description": {
      "S": "Light and smooth lager with subtle notes of citrus, perfect for a day at the beach."
    },
    "fillLevel": {
      "N": "60"
    },
    "temperature": {
      "N": "3"
    }
  },
  {
    "device_id": {
      "N": "-1"
    },
    "brand": {
      "S": "Urban Hops"
    },
    "name": {
      "S": "City Nights IPA"
    },
    "abv": {
      "N": "6.5"
    },
    "description": {
      "S": "Bold and hoppy IPA with tropical fruit flavors and a strong bitter finish."
    },
    "fillLevel": {
      "N": "90"
    },
    "temperature": {
      "N": "5"
    }
  },
  {
    "device_id": {
      "N": "-1"
    },
    "brand": {
      "S": "Countryside Ales"
    },
    "name": {
      "S": "Harvest Moon Beer"
    },
    "abv": {
      "N": "5.0"
    },
    "description": {
      "S": "Smooth wheat beer with hints of banana and clove, inspired by traditional Bavarian styles."
    },
    "fillLevel": {
      "N": "45"
    },
    "temperature": {
      "N": "5"
    }
  }
]
```

In this updated format, each item now includes a `device_id` attribute with a default value of `-1`. The `device_id` attribute is wrapped in an object with the type `"N"` for a number.
*/