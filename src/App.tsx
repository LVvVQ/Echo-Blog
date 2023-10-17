import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import MarketingLayout from "./layouts/MarketingLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
