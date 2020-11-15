import { Node } from "../models/tree";

export const createNewNode = (
  id: string,
  title: string,
  parent: Node | null = null
): Node => {
  return new Node(id, title, parent);
};

export const findRootNode = (node: Node): Node => {
  while (node.parent !== null) {
    return findRootNode(node.parent);
  }
  return node;
};
