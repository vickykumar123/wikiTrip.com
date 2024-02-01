import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import {myHotel} from "../api/hotelApi";
import HotelList from "../components/Hotel/HotelList";

export default function MyHotel() {
  const {data: hotelData, isLoading} = useQuery("myHotels", myHotel, {
    onError: () => {},
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/my-hotels/create-hotel"
          className="flex bg-blue-600 text-white text-md font-bold p-2 hover:bg-blue-500 rounded-lg hover:opacity-90 shadow-md shadow-slate-400 hover:shadow-lg"
        >
          Add My Hotel
        </Link>
      </span>
      <div>
        <h2 className="text-lg font-medium text-blue-800 text-center">
          Total Listing: {hotelData?.length}
        </h2>
      </div>
      {!hotelData && <span>No Hotel found</span>}
      {hotelData && !isLoading && <HotelList hotelData={hotelData!} />}
    </div>
  );
}
