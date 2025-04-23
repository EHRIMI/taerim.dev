import WeatherWid from "./weatherwid";
import CharWid from "./charwid";
import TodoList from "./todolist";
import "./glass.css";

export default function Widgetpage() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      padding: "2rem"
    }}>
      <WeatherWid />
      <CharWid />
      <TodoList />
    </div>
  );
}