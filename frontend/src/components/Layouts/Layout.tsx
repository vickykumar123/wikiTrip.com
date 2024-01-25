import {Outlet, useLocation} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "../Hero";

export default function Layout() {
  const pathName = useLocation();
  console.log(pathName);
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {pathName.pathname === "/" && <Hero />}
      <div className="container mx-auto py-10 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
