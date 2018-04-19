import {BlockadeSpace} from './BlockadeSpace';

export class Blockades {
  spaces: BlockadeSpace[];
  cost: number;
  blockade_ID: number;
}

/*
        "blockades": [
            {
                "spaces": [
                    {
                        "hexSpaceId": 1,
                        "strength": 1,
                        "minimalCost": 1000,
                        "minimalDepth": 0,
                        "color": "RIVER",
                        "point": {
                            "x": 5,
                            "y": 7
                        },
                        "parentBlockade": 0
                    },
                    {
                        "hexSpaceId": 2,
                        "strength": 1,
                        "minimalCost": 1000,
                        "minimalDepth": 0,
                        "color": "RIVER",
                        "point": {
                            "x": 6,
                            "y": 7
                        },
                        "parentBlockade": 0
                    },
                    {
                        "hexSpaceId": 3,
                        "strength": 1,
                        "minimalCost": 1000,
                        "minimalDepth": 0,
                        "color": "RIVER",
                        "point": {
                            "x": 7,
                            "y": 6
                        },
                        "parentBlockade": 0
                    },
                    {
                        "hexSpaceId": 4,
                        "strength": 1,
                        "minimalCost": 1000,
                        "minimalDepth": 0,
                        "color": "RIVER",
                        "point": {
                            "x": 8,
                            "y": 6
                        },
                        "parentBlockade": 0
                    }
                ],
                "cost": 1,
                "blockade_ID": 1
            },
 */
