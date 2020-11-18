import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { Node } from "../../../models/tree";
import { HierarchyNode } from "./hierachy-node";

interface Props {
  rootNode: Node;
  addRootChildNode: () => void;
  addChildNode: (node: Node) => void;
  deleteChildNode: (node: Node) => void;
  updateTitle: (value: string, node: Node) => void;
}
export const HierarchyStep = ({
  rootNode,
  addRootChildNode,
  addChildNode,
  updateTitle,
  deleteChildNode,
}: Props) => {
  return (
    <div>
      <h2>Step 1</h2>
      <div style={styles.wrapper}>
        <div style={styles.mainNode}>
          <h5 style={styles.mainTitle}>{rootNode.title}</h5>
          <Button variant="contained" onClick={addRootChildNode}>
            <AddIcon />
          </Button>
        </div>
        <div style={styles.childContainer}>
          {rootNode.children && rootNode.children.length > 0 && (
            <HierarchyNode
              nodes={rootNode.children}
              addChild={addChildNode}
              updateTitle={updateTitle}
              deleteChild={deleteChildNode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {},

  mainTitle: {
    margin: 0,
  },
  childContainer: {
    marginLeft: "60px",
  },
  mainNode: {
    border: "1px solid black",
    marginBottom: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  input: {
    fontWeight: 600,
    border: 0,
    outline: 0,
    flex: 1,
  },
};
