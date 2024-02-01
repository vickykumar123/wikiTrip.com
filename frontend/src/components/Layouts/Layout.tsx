import {Outlet, useLocation} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "../Hero";
import SearchBar from "../Search/SearchBar";

export default function Layout() {
  const pathName = useLocation();

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {pathName.pathname === "/" && <Hero />}
      {(pathName.pathname === "/" || pathName.pathname === "/search") && (
        <div className="container mx-auto">
          <SearchBar />
        </div>
      )}
      <div className="container mx-auto py-10 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
