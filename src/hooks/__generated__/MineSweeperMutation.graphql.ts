/**
 * @generated SignedSource<<2f35da7fdd229d2f09003a5edab683af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CoordinatesInput = {
  x: number;
  y: number;
};
export type MineSweeperMutation$variables = {
  action: string;
  coordinates: CoordinatesInput;
  slug: string;
};
export type MineSweeperMutation$data = {
  readonly updateBoard: {
    readonly gameOver: boolean;
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
      readonly slug: string;
    };
    readonly timeElapsed: number;
    readonly won: boolean;
  };
};
export type MineSweeperMutation = {
  response: MineSweeperMutation$data;
  variables: MineSweeperMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "action"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "coordinates"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "action",
        "variableName": "action"
      },
      {
        "kind": "Variable",
        "name": "coordinates",
        "variableName": "coordinates"
      },
      {
        "kind": "Variable",
        "name": "slug",
        "variableName": "slug"
      }
    ],
    "concreteType": "UpdateBlockPayload",
    "kind": "LinkedField",
    "name": "updateBoard",
    "plural": false,
    "selections": [
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
        "kind": "ScalarField",
        "name": "won",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "gameOver",
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MineSweeperMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "MineSweeperMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "ea2044c34f82a1252762c0b6506cdfc5",
    "id": null,
    "metadata": {},
    "name": "MineSweeperMutation",
    "operationKind": "mutation",
    "text": "mutation MineSweeperMutation(\n  $slug: String!\n  $coordinates: CoordinatesInput!\n  $action: String!\n) {\n  updateBoard(slug: $slug, coordinates: $coordinates, action: $action) {\n    mineSweeper {\n      slug\n      flags\n      blocks {\n        coordinates {\n          x\n          y\n        }\n        display\n        isFlagged\n      }\n    }\n    timeElapsed\n    won\n    gameOver\n  }\n}\n"
  }
};
})();

(node as any).hash = "b2a6aa11aac9d3d453006571f0b6aa70";

export default node;
