"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type TodoProps = {
  dummy: string[];
};

export default function Todo({ dummy }: TodoProps){

  const [todos, setTodos] = useState<string[]>(dummy);
  const [input, setInput] = useState("");
  const [error, setError] = useState(""); 
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addTodo = () => {

    if (!input.trim()) {
      setError("Todo tidak boleh kosong!");
      return;
    }

    setTodos([...todos, input]);
    setInput("");
    setError(""); 
  };

  const confirmDelete = (index:number) => {
    setDeleteIndex(index);
  };

  const deleteTodo = () => {
    if(deleteIndex !== null){
      const newTodos = todos.filter((_,i)=> i !== deleteIndex);
      setTodos(newTodos);
      setDeleteIndex(null);
    }
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  return(
    <div className="container">

      <div className="card">

        <div className="header">
          <h2>My To Do List</h2>

          {/* Error dipindahkan ke sini */}
          {error && <p className="error">{error}</p>}

          <div className="inputArea">

            <input
              type="text"
              placeholder="Title..."
              value={input}
              onChange={(e)=>setInput(e.target.value)}
            />

            <Button variant="outline" onClick={addTodo}>
              Add
            </Button>

          </div>
        </div>

        <ul className="list">

          {todos.map((todo,index)=>(
            <li key={index}>
              {todo}
              <span 
                className="delete"
                onClick={()=>confirmDelete(index)}
              >
                ×
              </span>
            </li>
          ))}

        </ul>

      </div>

      {/* Modal konfirmasi */}
      {deleteIndex !== null && (
        <div className="modalOverlay">
          <div className="modalBox">
            <p>Anda yakin ingin menghapus todo ini?</p>

            <div className="modalButton">
              <Button onClick={deleteTodo}>Ya</Button>
              <Button onClick={cancelDelete} variant="destructive">
                Batal
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}