import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { ChangeEvent } from "react";
import { Node } from "../../../models/tree";

interface Props {
  nodes: Node[];
  addChild: (node: Node) => void;
  updateTitle: (value: string, node: Node) => void;
  deleteChild: (node: Node) => void;
}
export const HierarchyNode = ({
  nodes,
  addChild,
  deleteChild,
  updateTitle,
}: Props) => {
  return (
    <div>
      {nodes.map((node) => (
        <div key={node.id} style={styles.wrapper}>
          <div style={styles.mainNode}>
            <input
              placeholder="Typing your title"
              type="text"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateTitle(event.target.value, node)
              }
              style={styles.input}
            />
            <div>
              <Button variant="contained" onClick={() => addChild(node)}>
                <AddIcon />
              </Button>

              <Button variant="contained" onClick={() => deleteChild(node)}>
                <DeleteIcon />
              </Button>
            </div>
          </div>
          <div id={node.id} style={styles.childContainer}>
            {node.children.length > 0 && (
              <HierarchyNode
                nodes={node.children}
                addChild={addChild}
                deleteChild={deleteChild}
                updateTitle={updateTitle}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  wrapper: {},

  childContainer: {
    marginLeft: "60px",
  },
  mainNode: {
    border: "1px solid black",
    marginBottom: 16,
    display: "flex",
    justifyContent: "space-between",
    padding: 8,
  },
  input: {
    fontWeight: 600,
    border: 0,
    outline: 0,
    flex: 1,
  },
};
