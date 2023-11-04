import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import MarketingLayout from "@/layouts/MarketingLayout";
import NotFound from "@/pages/NotFound";
import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Login";
import DashBoard from "@/pages/DashBoard";
import RequireAuth from "@/components/RequireAuth";
import DashboardLayout from "@/layouts/DashboardLayout";
import SignUpLayout from "@/layouts/SignUpLayout";
import SignUp from "@/pages/SignUp";
import EditorLayout from "@/layouts/EditorLayout";
import EditorPage from "@/pages/Editor";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<SignUpLayout />}>
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
          <Route path="/editor" element={<EditorLayout />}>
            <Route path=":postId" element={<EditorPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
