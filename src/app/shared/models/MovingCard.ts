import {Card} from './Card';

export class MovingCard extends Card {
  type: string;
  name: string;
  coinValue: number;
  coinCost: number;
  strength: number;
  depth: number;
  colors: string[];
  id: number;
}


/*
"@type": "MovingCard",
"name": "Traveler",
"coinValue": 1,
"coinCost": 0,
"strength": 2,
"depth": 99,
"colors": [
  "SAND"
],
"boardID": 112
},
 */
