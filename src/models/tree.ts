export class Position {
  id: string;
  title: string;
  users: string[];

  constructor(id: string, title: string, users: string[] = []) {
    this.id = id;
    this.title = title;
    this.users = users;
  }
}

export class Node {
  id: string;
  title: string;
  parent: Node | null;
  children: Node[];
  positions: Position[];

  constructor(
    id: string,
    title: string,
    parent: Node | null = null,
    children: Node[] = [],
    positions: Position[] = []
  ) {
    this.id = id;
    this.title = title;
    this.parent = parent;
    this.children = children;
    this.positions = positions;
  }

  addNode(newNode: Node) {
    this.children.push(newNode);
  }
  removeNode(node: Node) {
    this.children = this.children.filter((item) => item.id !== node.id);
  }
  addPosition(newPosition: Position) {
    this.positions.push(newPosition);
  }
}

export interface TransverseProps {
  open: boolean;
}
