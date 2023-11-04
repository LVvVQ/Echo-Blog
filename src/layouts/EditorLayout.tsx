import { Outlet } from "react-router-dom";

export default function EditorLayout() {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      <Outlet />
    </div>
  )
}
