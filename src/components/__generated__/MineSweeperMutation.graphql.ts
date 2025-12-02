/**
 * @generated SignedSource<<0999de0d08bcde6e844aa32fad3ce509>>
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
    "cacheID": "605adcb7d74168d0a41993db98faa4f2",
    "id": null,
    "metadata": {},
    "name": "MineSweeperMutation",
    "operationKind": "mutation",
    "text": "mutation MineSweeperMutation(\n  $slug: String!\n  $coordinates: CoordinatesInput!\n  $action: String!\n) {\n  updateBoard(slug: $slug, coordinates: $coordinates, action: $action) {\n    mineSweeper {\n      slug\n      flags\n      blocks {\n        coordinates {\n          x\n          y\n        }\n        display\n        isFlagged\n      }\n    }\n    gameOver\n  }\n}\n"
  }
};
})();

(node as any).hash = "b7c72f1873fa0274fa812228a00e6515";

export default node;
