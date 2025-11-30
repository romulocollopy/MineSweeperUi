/**
 * @generated SignedSource<<64f7d0755e770c1b4d9f5a96093e18db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MineSweeperQuery$variables = Record<PropertyKey, never>;
export type MineSweeperQuery$data = {
  readonly mineSweeper: {
    readonly board: {
      readonly blocks: ReadonlyArray<{
        readonly coordinates: {
          readonly x: number;
          readonly y: number;
        };
        readonly isBomb: boolean;
      }>;
    };
  };
};
export type MineSweeperQuery = {
  response: MineSweeperQuery$data;
  variables: MineSweeperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "MineSweeper",
    "kind": "LinkedField",
    "name": "mineSweeper",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Board",
        "kind": "LinkedField",
        "name": "board",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Block",
            "kind": "LinkedField",
            "name": "blocks",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Coordinates",
                "kind": "LinkedField",
                "name": "coordinates",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "x",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "y",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isBomb",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MineSweeperQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MineSweeperQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "022083e7f883662fbacb33c07d28cfe5",
    "id": null,
    "metadata": {},
    "name": "MineSweeperQuery",
    "operationKind": "query",
    "text": "query MineSweeperQuery {\n  mineSweeper {\n    board {\n      blocks {\n        coordinates {\n          x\n          y\n        }\n        isBomb\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd5c4234d2886329f5c5b7797b6a3038";

export default node;
