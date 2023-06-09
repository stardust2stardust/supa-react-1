import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Update";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <div className="">
      <Layout>
        <Routes>
          <Route
            index
            element={<Home />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Protected Routes */}
          <Route element={<AuthRoute />}>
            <Route
              path="/:id"
              element={<Update />}
            />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
