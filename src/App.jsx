import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Update from "./pages/Update";
import AuthRoute from "./components/AuthRoute";
import Create from "./pages/Create";
import BowlsList from "./components/BowlsList";

function App() {
  return (
    <div className="font-nunito bg-gray-100 h-screen">
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
            element={<BowlsList />}
          />

          {/* Protected Routes */}
          <Route element={<AuthRoute />}>
            <Route
              path="/create"
              element={<Create />}
            />

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
