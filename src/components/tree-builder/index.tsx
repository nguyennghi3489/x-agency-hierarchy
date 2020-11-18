import { Button } from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import React, { ChangeEvent, useState } from "react";
import { Node, Position } from "../../models/tree";
import { findRootNode } from "../../utils";
import { HierarchyStep } from "./hierarchy-step/hierarchy-step";

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

    setRootNode(newRootNode);
    setRerender(!rerender);
  };

  const deleteChildNode = (node: Node) => {
    const nodeParent = node.parent;
    if (nodeParent) {
      nodeParent.removeNode(node);
      const newRootNode = findRootNode(nodeParent);

      setRootNode(newRootNode);
      setRerender(!rerender);
    }
  };

  const addPositionNode = (node: Node) => {
    const randomId = (Math.random() * 1000000).toString(); //TODO: Use a good library to create uuid

    const newPosition = new Position(randomId, "");
    node.addPosition(newPosition);
    const newRootNode = findRootNode(node);

    setRootNode(newRootNode);
    setRerender(!rerender);
  };

  const updateNodeTitle = (title: string, node: Node) => {
    node.title = title;
    const newRootNode = findRootNode(node);

    setRootNode(newRootNode);
    setRerender(!rerender);
  };

  const updatePositionTitle = (
    title: string,
    position: Position,
    node: Node
  ) => {
    node.positions.map((item) => {
      if (item.id === position.id) {
        item.title = title;
      }
      return item;
    });
    const newRootNode = findRootNode(node);

    setRootNode(newRootNode);
    setRerender(!rerender);
  };

  const [rootNode, setRootNode] = useState(mockRootNode);
  const [rerender, setRerender] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div style={{ width: "80%" }}>
      <h2>Build your tree now</h2>

      <HierarchyStep
        rootNode={rootNode}
        addRootChildNode={addRootChildNode}
        addChildNode={addChildNode}
        deleteChildNode={deleteChildNode}
        updateTitle={updateNodeTitle}
      />

      {/* {currentStep === 1 && (
        <div>
          <h2>Step 1</h2>
          <div>
            <div>
              {rootNode.title}
              <Button variant="contained" onClick={addRootChildNode}>
                <AddIcon />
              </Button>
            </div>
            {rootNode.children && rootNode.children.length > 0 && (
              <ChildNodes
                nodes={rootNode.children}
                addChildNode={addChildNode}
                updateTitle={updateNodeTitle}
              />
            )}
          </div>
          <Button onClick={() => setCurrentStep(2)}>Next Step</Button>
        </div>
      )} */}
      {/* {currentStep === 2 && (
        <div>
          <h2>Step 2</h2>
          <div>
            <div>{rootNode.title}</div>
            {rootNode.children && rootNode.children.length > 0 && (
              <ChildPositionNodes
                updatePositionTitle={updatePositionTitle}
                nodes={rootNode.children}
                addPositionNode={addPositionNode}
                toggleNode={() => {}}
              />
            )}
          </div>
          <Button onClick={() => console.log(rootNode)}>Next Step</Button>
        </div>
      )} */}
    </div>
  );
};

interface Props {
  nodes: Node[];
  addChildNode: (node: Node) => void;
  updateTitle: (value: string, node: Node) => void;
}
const ChildNodes = ({ nodes, addChildNode, updateTitle }: Props) => {
  return (
    <div>
      {nodes.map((node) => (
        <div key={node.id}>
          <div>
            <input
              type="text"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateTitle(event.target.value, node)
              }
            />
            <Button variant="contained" onClick={() => addChildNode(node)}>
              <AddIcon />
            </Button>
          </div>
          <div id={node.id} style={{ paddingLeft: "220px" }}>
            {node.children.length > 0 && (
              <ChildNodes
                nodes={node.children}
                addChildNode={addChildNode}
                updateTitle={updateTitle}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

interface PositionProps {
  nodes: Node[];
  addPositionNode: (node: Node) => void;
  toggleNode: (value: string, node: Node) => void;
  updatePositionTitle: (title: string, position: Position, node: Node) => void;
}
const ChildPositionNodes = ({
  nodes,
  addPositionNode,
  updatePositionTitle,
  toggleNode,
}: PositionProps) => {
  return (
    <div>
      {nodes.map((node) => (
        <div key={node.id}>
          <div>
            <h3>{node.title}</h3>
            <Button variant="contained" onClick={() => addPositionNode(node)}>
              <AddIcon />
            </Button>
            <Button variant="contained" onClick={() => {}}>
              <ExpandLess />
            </Button>
            {node.positions.length > 0 &&
              node.positions.map((item) => (
                <input
                  key={item.id}
                  type="text"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updatePositionTitle(event.target.value, item, node)
                  }
                />
              ))}
          </div>
          <div id={node.id} style={{ paddingLeft: "220px" }}>
            {node.children.length > 0 && (
              <ChildPositionNodes
                updatePositionTitle={updatePositionTitle}
                nodes={node.children}
                addPositionNode={addPositionNode}
                toggleNode={toggleNode}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
