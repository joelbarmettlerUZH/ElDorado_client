import {Card} from './Card';
export class RemoveMovingCard extends Card {
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
"@type": "RemoveMoveCard",
"id": 29,
"name": "Treasure chest",
"coinValue": 4,
"coinCost": 3,
"strength": 4,
"depth": 99,
"colors": [
"JUNGLE"
 */
