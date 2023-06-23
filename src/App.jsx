import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Update from "./pages/Update";
import AuthRoute from "./components/AuthRoute";
import Create from "./pages/Create";
import Bowls from "./pages/Bowls";
import SingleRecipe from "./pages/SingleRecipe";

function App() {
  return (
    <div className="font-nunito bg-green-700 min-h-screen">
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
          <Route
            path="/success"
            element={<Success />}
          />
          <Route
            path="/bowls"
            element={<Bowls />}
          />
          <Route
            path="/:id"
            element={<SingleRecipe />}
          />

          {/* Protected Routes */}
          <Route element={<AuthRoute />}>
            <Route
              path="/create"
              element={<Create />}
            />

            <Route
              path="/edit/:id"
              element={<Update />}
            />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
