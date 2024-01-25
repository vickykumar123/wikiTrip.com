import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-blue-800 py-10 dark:bg-slate-900 relative bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-mono tracking-tighter cursor-pointer">
          <Link to="/">wikiTrip.com</Link>
        </span>
        <span className="text-white font-bold tracking-tighter flex flex-col items-center sm:flex-row sm:gap-4 cursor-pointer">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </span>
      </div>
    </div>
  );
}
