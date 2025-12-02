/**
 * @generated SignedSource<<0b3909bbd4234d349053af9031efa177>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MineSweeperQuery$variables = {
  slug: string;
};
export type MineSweeperQuery$data = {
  readonly mineSweeper: {
    readonly blocks: ReadonlyArray<{
      readonly coordinates: {
        readonly x: number;
        readonly y: number;
      };
      readonly display: string;
      readonly isFlagged: boolean;
    }>;
    readonly flags: number;
    readonly gameOver: boolean;
    readonly slug: string;
    readonly won: boolean;
  };
};
export type MineSweeperQuery = {
  response: MineSweeperQuery$data;
  variables: MineSweeperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "slug",
        "variableName": "slug"
      }
    ],
    "concreteType": "MineSweeper",
    "kind": "LinkedField",
    "name": "mineSweeper",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "flags",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "gameOver",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "won",
        "storageKey": null
      },
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
            "name": "display",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFlagged",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MineSweeperQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MineSweeperQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "577bfe833e4e790764da767fec523566",
    "id": null,
    "metadata": {},
    "name": "MineSweeperQuery",
    "operationKind": "query",
    "text": "query MineSweeperQuery(\n  $slug: String!\n) {\n  mineSweeper(slug: $slug) {\n    slug\n    flags\n    gameOver\n    won\n    blocks {\n      coordinates {\n        x\n        y\n      }\n      display\n      isFlagged\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "75c743d7302afed28136831edd631650";

export default node;
