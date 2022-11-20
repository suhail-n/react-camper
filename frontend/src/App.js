import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { CampsDetailPage } from "./components/Pages/Camps/CampsDetailPage";
import { CampsPage } from "./components/Pages/Camps/CampsPage";
import { NewCampPage } from "./components/Pages/Camps/NewCampPage";
import { LoginPage } from "./components/Pages/Login/LoginPage";
import { RegisterPage } from "./components/Pages/Registeration/RegisterPage";
import RequireAuth from "./components/UI/RequireAuth/RequireAuth";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CampsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/camps/new" element={<NewCampPage />} />
        </Route>
        <Route path="/camps/:id" element={<CampsDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
