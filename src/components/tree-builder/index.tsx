import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { Node } from "../../models/tree";
import { findRootNode } from "../../utils";

const mockRootNode = new Node("0", "Something");
export const AgencyHierarchy = () => {
  const addRootChildNode = () => {
    const randomId = (Math.random() * 1000000).toString();
    const newRootNode = new Node(
      rootNode.id,
      rootNode.title,
      null,
      rootNode.children
    );
    const newNode = new Node(randomId, "", newRootNode);
    newRootNode.addNode(newNode);

    setRootNode(newRootNode);
  };

  const addChildNode = (node: Node) => {
    const randomId = (Math.random() * 1000000).toString(); //TODO: Use a good library to create uuid

    const newNode = new Node(randomId, "", node);
    node.addNode(newNode);
    const newRootNode = findRootNode(node);
    console.log(newRootNode);

    setRootNode(newRootNode);
    setRerender(!rerender);
  };

  const [rootNode, setRootNode] = useState(mockRootNode);
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <h2>Build your tree now</h2>

      <div>
        <div>
          {rootNode.title}
          <Button variant="contained" onClick={addRootChildNode}>
            <AddIcon />
          </Button>
        </div>
        {rootNode.children && rootNode.children.length > 0 && (
          <ChildNodes nodes={rootNode.children} addChildNode={addChildNode} />
        )}
      </div>
    </div>
  );
};

interface Props {
  nodes: Node[];
  addChildNode: (node: Node) => void;
}
const ChildNodes = ({ nodes, addChildNode }: Props) => {
  return (
    <div>
      {nodes.map((node) => (
        <div key={node.id}>
          <div>
            <input type="text" />
            <Button variant="contained" onClick={() => addChildNode(node)}>
              <AddIcon />
            </Button>
          </div>
          <div id={node.id} style={{ paddingLeft: "220px" }}>
            {node.children.length > 0 && (
              <ChildNodes nodes={node.children} addChildNode={addChildNode} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
