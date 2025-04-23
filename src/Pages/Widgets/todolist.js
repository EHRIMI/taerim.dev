// Pages/widget/todolist.js
import { useState } from "react";
import "./glass.css";

function TodoList() {
  const [tasks, setTasks] = useState([
    { text: "UI 다듬기", done: false },
    { text: "Three.js 연결", done: true },
    { text: "glass 스타일 적용", done: false },
  ]);

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  return (
    <div className="widget-glass" style={{ width: "300px", padding: "1rem" }}>
      <h3 style={{ color: "white", marginBottom: "0.5rem" }}>할 일 목록 ✅</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, i) => (
          <li
            key={i}
            onClick={() => toggleTask(i)}
            style={{
              marginBottom: "0.5rem",
              padding: "0.4rem 0.6rem",
              borderRadius: "8px",
              backgroundColor: task.done ? "#4caf50" : "rgba(255,255,255,0.1)",
              color: "white",
              cursor: "pointer",
              textDecoration: task.done ? "line-through" : "none",
            }}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;