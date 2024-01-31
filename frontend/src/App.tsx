import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import {DarkModeProvider} from "./context/DarkModeContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateHotel from "./pages/CreateHotel";
import MyHotel from "./pages/MyHotel";
import EditMyHotel from "./pages/EditMyHotel";

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
                <Route path="/my-hotels" element={<MyHotel />} />
                <Route
                  path="/my-hotels/create-hotel"
                  element={<CreateHotel />}
                />
                <Route
                  path="/my-hotels/edit-hotel/:hotelId"
                  element={<EditMyHotel />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  );
}

export default App;
