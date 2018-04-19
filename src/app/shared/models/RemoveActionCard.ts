import {Action} from './Action';
import {Card} from './Card';
export class RemoveActionCard extends Card {
  type: string;
  name: string;
  coinValue: number;
  coinCost: number;
  actions: Action;
  id: number;
}

/*
"@type": "RemoveActionCard",
"id": 37,
"name": "Transmitter",
"coinValue": 0.5,
"coinCost": 4,
"actions": {
  "draw": 0,
  "remove": 0,
  "steal": 1
 */
