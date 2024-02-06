import {useQuery} from "react-query";
import LatestDestinationCard from "../components/LastestDestinationCard";
import {fetchAllHotel} from "../api/searchApi";
import {Link} from "react-router-dom";
import Loader from "../components/ui/Loader";

const Home = () => {
  const {data: hotels, isLoading} = useQuery("fetchQuery", () =>
    fetchAllHotel()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} latest={true} />
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-bold">Offers</h2>
          <p className="p-3">Promotions, deals, and special offers for you</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <div className="border border-slate-200 p-4 rounded-md max-w-[600px] shadow-md">
              <section className="grid grid-cols-[2fr_1fr] w-full">
                <div className="relative">
                  <h3 className="text-xl font-bold">
                    Take your longest vacation yet
                  </h3>
                  <p className="text-sm md:text-base">
                    Browse properties offering long-term stays, many at reduced
                    monthly rates.
                  </p>
                  <Link
                    to={`/search`}
                    className="bg-blue-500 p-2 text-white font-semibold rounded-md absolute bottom-0"
                  >
                    Find a stay
                  </Link>
                </div>
                <div className="h-[150px]">
                  <img src="/family.jpeg" alt="family" className="h-full" />
                </div>
              </section>
            </div>
            <div className="border border-slate-200 p-4 rounded-md max-w-xl shadow-md">
              <section className="grid grid-cols-[2fr_1fr] w-full">
                <div className="relative">
                  <h3 className="text-xl font-bold">
                    Fly away to your dream vacation
                  </h3>
                  <p>
                    Get inspired – compare and book flights with flexibility
                  </p>
                  <Link
                    to={`/search`}
                    className="bg-blue-500 p-2 text-white font-semibold rounded-md absolute bottom-0"
                  >
                    Find a stay
                  </Link>
                </div>
                <div className="h-[150px]">
                  <img src="/family.jpeg" alt="family" className="h-full" />
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
