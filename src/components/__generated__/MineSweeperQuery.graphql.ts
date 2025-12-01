/**
 * @generated SignedSource<<f7dd68c5b73bf1a2e920780f49291dad>>
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
    }>;
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
    "cacheID": "f22a64c8f53ec915934cfdf0d5077ceb",
    "id": null,
    "metadata": {},
    "name": "MineSweeperQuery",
    "operationKind": "query",
    "text": "query MineSweeperQuery(\n  $slug: String!\n) {\n  mineSweeper(slug: $slug) {\n    slug\n    blocks {\n      coordinates {\n        x\n        y\n      }\n      display\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "27b1a5db5f88c462b79963e9da0d5de6";

export default node;
