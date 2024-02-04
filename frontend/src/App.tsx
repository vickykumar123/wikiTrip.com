import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import {DarkModeProvider} from "./context/DarkModeContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateHotel from "./pages/CreateHotel";
import MyHotel from "./pages/MyHotel";
import EditMyHotel from "./pages/EditMyHotel";
import Search from "./pages/Search";
import HotelDetail from "./pages/HotelDetail";
import {useAppSelector} from "./redux/hooks";
import NotFound from "./pages/NotFound";

function App() {
  const {user} = useAppSelector((state) => state.user);
  return (
    <>
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/detail/:hotelId" element={<HotelDetail />} />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
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
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  );
}

export default App;
