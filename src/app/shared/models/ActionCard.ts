import {BlockadeSpace} from './BlockadeSpace';
import {Action} from './Action';

export class ActionCard {
  type: string;
  name: string;
  coinValue: number;
  coinCost: number;
  id: number;
  actions: Action;
}

/*
                     {
                            "@type": "ActionCard",
                            "name": "Cartographer",
                            "coinValue": 0.5,
                            "coinCost": 4,
                            "id": 71,
                            "actions": {
                                "draw": 2,
                                "remove": 0,
                                "steal": 0
                            }
 */
