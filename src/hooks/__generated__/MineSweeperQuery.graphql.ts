/**
 * @generated SignedSource<<9df2b0cbca49b64f250338b5eded4fdd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MineSweeperQuery$variables = {
  difficulty: string;
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
    readonly timeElapsed: number;
    readonly won: boolean;
  };
};
export type MineSweeperQuery = {
  response: MineSweeperQuery$data;
  variables: MineSweeperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "difficulty"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "difficulty",
        "variableName": "difficulty"
      },
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
        "kind": "ScalarField",
        "name": "timeElapsed",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MineSweeperQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "MineSweeperQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "07c1e5dc3288f2469bccc70b10c66edf",
    "id": null,
    "metadata": {},
    "name": "MineSweeperQuery",
    "operationKind": "query",
    "text": "query MineSweeperQuery(\n  $slug: String!\n  $difficulty: String!\n) {\n  mineSweeper(slug: $slug, difficulty: $difficulty) {\n    slug\n    flags\n    gameOver\n    won\n    timeElapsed\n    blocks {\n      coordinates {\n        x\n        y\n      }\n      display\n      isFlagged\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "eeecdbcce40bb189861ac6993bd97fe7";

export default node;
