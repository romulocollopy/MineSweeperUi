/**
 * @generated SignedSource<<d775a5b9c2cd70937bb47f7cbf72725c>>
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
    readonly slug: string;
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
    "cacheID": "6a4de4c7f9e37842a8587a4df3da1475",
    "id": null,
    "metadata": {},
    "name": "MineSweeperQuery",
    "operationKind": "query",
    "text": "query MineSweeperQuery(\n  $slug: String!\n) {\n  mineSweeper(slug: $slug) {\n    slug\n    flags\n    blocks {\n      coordinates {\n        x\n        y\n      }\n      display\n      isFlagged\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6b86412d870791f10ac9eefc31762949";

export default node;
