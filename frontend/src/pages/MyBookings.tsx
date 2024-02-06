import {useQuery} from "react-query";
import {fetchMyBooking} from "../api/bookingApi";
import {Link} from "react-router-dom";
import Loader from "../components/ui/Loader";

export default function MyBookings() {
  const {data: hotels, isLoading} = useQuery("fetchMyBookings", fetchMyBooking);

  if (isLoading) return <Loader />;

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
        >
          <div className="lg:w-full lg:h-[250px]">
            <Link to={`/search/detail/${hotel._id}`}>
              <img
                src={hotel.imageUrls[0]}
                className="w-full h-full object-cover object-center rounded-md"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div>
              <h2 className="text-2xl font-bold text-blue-700 hover:opacity-85">
                <Link to={`/search/detail/${hotel._id}`}>
                  {hotel.hotelName}
                </Link>
              </h2>
              <div className="text-xs font-normal text-blue-900 italic">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            <p className="font-medium">Your Booking Dates</p>
            {hotel.bookings!.map((booking) => (
              <div key={booking._id}>
                <div>
                  <span className="font-bold mr-2">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
