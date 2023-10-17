import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import MarketingLayout from "./layouts/MarketingLayout";

function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
