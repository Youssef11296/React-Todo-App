import React, { useState, useEffect } from "react";
import Todo from "./comps/Todo";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import db from "./Firebase/Config";
import firebase from "firebase";

function App() {
  // The States
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  // Methods
  // Adding New Todo && Re-freshing Our Firebase Docs
  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  // Holding The Firebase Docs With The Magic Of SNAPSHOT
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  // Main Render
  return (
    <div className="app">
      <form className="app__form" onSubmit={addTodo}>
        <FormControl className="app__formControl">
          <InputLabel>Add a Todo ...</InputLabel>
          <Input
            type="text"
            placeholder="Enter a Todo.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
          className="app__formBtn"
        >
          Add
        </Button>
      </form>

      <div className="todos__container">
        {todos.map((todo) => (
          <Todo key={todo.id} id={todo.id} todo={todo.data} />
        ))}
      </div>
    </div>
  );
}

export default App;
