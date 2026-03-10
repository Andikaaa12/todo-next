// import Todo from "../components/todo";

import Todo from "@/components/todo";

const dummy = [
  "testing 1",
  "testing 2"
]

export default function Home() {
  return <Todo dummy = {dummy} />;
}