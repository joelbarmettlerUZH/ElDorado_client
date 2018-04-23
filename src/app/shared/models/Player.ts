import {Card} from './Card';
import {assertNumber} from '@angular/core/src/render3/assert';
import {Blockade} from './Blockade';
import {PlayingPiece} from './PlayingPiece';
import {Action} from './Action';
import {CardAction} from './CardAction';

export class Player {
  playerId: number;
  characterNumber: number;
  token: string;
  removeBlockades: number[];
  blockades: number[];
  coins: number;
  playingPieces: PlayingPiece[];
  specialAction: Action;
  history: CardAction;
  handPile: Card[];
  bought: boolean;
}

/*
 "playerId": 2,
            "characterNumber": 1,
            "name": "Marius",
            "token": "TESTTOKEN",
            "removeBlockades": [],
            "blockades": [],
            "coins": 0,
            "playingPieces": [
                {
                    "playingPieceId": 0,
                    "standsOn": {
                        "hexSpaceId": 709,
                        "strength": 1000,
                        "minimalCost": 1000,
                        "minimalDepth": 0,
                        "color": "STARTFIELD",
                        "point": {
                            "x": 1,
                            "y": 2
                        }
                    }
                },
                {
                    "playingPieceId": 1,
                    "standsOn": {
                        "hexSpaceId": 710,
                        "strength": 1000,
                        "minimalCost": 1000,
                        "minimalDepth": 0,
                        "color": "STARTFIELD",
                        "point": {
                            "x": 1,
                            "y": 3
                        }
                    }
                }
            ],
            "specialAction": {
                "draw": 0,
                "remove": 0,
                "steal": 0
            },
            "history": [
                {
                    "actionName": "Testaction",
                    "cards": []
                }
            ],
            "handPile": [
                {
                    "@type": "MovingCard",
                    "name": "Traveler",
                    "coinValue": 1,
                    "coinCost": 0,
                    "strength": 2,
                    "depth": 99,
                    "colors": [
                        "SAND"
                    ],
                    "id": 112
                },
                {
                    "@type": "MovingCard",
                    "name": "Traveler",
                    "coinValue": 1,
                    "coinCost": 0,
                    "strength": 2,
                    "depth": 99,
                    "colors": [
                        "SAND"
                    ],
                    "id": 113
                },
                {
                    "@type": "MovingCard",
                    "name": "Sailor",
                    "coinValue": 0.5,
                    "coinCost": 0,
                    "strength": 1,
                    "depth": 99,
                    "colors": [
                        "RIVER"
                    ],
                    "id": 114
                },
                {
                    "@type": "MovingCard",
                    "name": "Explorer",
                    "coinValue": 0.5,
                    "coinCost": 0,
                    "strength": 2,
                    "depth": 99,
                    "colors": [
                        "JUNGLE"
                    ],
                    "id": 115
                }
            ],
            "bought": false
 */
