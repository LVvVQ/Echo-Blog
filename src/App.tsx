import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import MarketingLayout from "@/layouts/MarketingLayout";
import NotFound from "@/pages/NotFound";
import RootLayout from "@/layouts/RootLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
