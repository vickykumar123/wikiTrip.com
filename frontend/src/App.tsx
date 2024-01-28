import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import {DarkModeProvider} from "./context/DarkModeContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateHotel from "./pages/CreateHotel";

function App() {
  return (
    <>
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/create-hotel" element={<CreateHotel />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  );
}

export default App;
