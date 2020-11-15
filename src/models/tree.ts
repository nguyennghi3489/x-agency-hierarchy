// export class Tree {
//   nodes: Node[];
//   title: string;
//   parent: null;

//   constructor(title: string, nodes: Node[]) {
//     this.title = title;
//     this.nodes = nodes;
//     this.parent = null;
//   }

//   addNode(newNode: Node) {
//     this.nodes.push(newNode);
//   }
// }

export class Node {
  id: string;
  title: string;
  parent: Node | null;
  children: Node[];
  constructor(
    id: string,
    title: string,
    parent: Node | null = null,
    children: Node[] = []
  ) {
    this.id = id;
    this.title = title;
    this.parent = parent;
    this.children = children;
  }

  addNode(newNode: Node) {
    this.children.push(newNode);
  }
}

export interface TransverseProps {
  open: boolean;
}
