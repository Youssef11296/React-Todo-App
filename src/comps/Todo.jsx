import React, { useState } from "react";
import { Button, List, ListItem, ListItemText, Modal } from "@material-ui/core";
import "./Todo.css";
import db from "../Firebase/Config";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import { SettingsInputAntenna } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos")
      .doc(props.id)
      .set(
        {
          text: input ? input : props.todo.text,
        },
        { merge: true }
      );

    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper}>
          <h4>I'm a Modal ..</h4>
          <form>
            <input
              value={input}
              placeholder={props.todo.text}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="todo__btn" type="submit" onClick={updateTodo}>
              Update
            </button>
          </form>
        </div>
      </Modal>
      <List className="todo__item" component="h2">
        <ListItem>
          <ListItemText
            primary={props.todo.text}
            secondary="Dummy deadline"
          ></ListItemText>
        </ListItem>
        <div className="todo__btns">
          <DeleteForeverIcon
            variant="contained"
            color="secondary"
            className="todo__btn"
            onClick={(e) => db.collection("todos").doc(props.id).delete()}
          />
          <Button
            variant="contained"
            color="default"
            className="todo__btn"
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
        </div>
      </List>
    </>
  );
};

export default Todo;
