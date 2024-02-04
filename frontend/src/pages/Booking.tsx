import {useQuery} from "react-query";
import {currentUserApi} from "../api/userApi";
import BookingForm from "../components/Form/BookingForm";
import {useSearchContext} from "../context/SearchContext";
import {useParams} from "react-router-dom";
import {fetchHotelById} from "../api/searchApi";
import {useEffect, useState} from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

export default function Booking() {
  const search = useSearchContext();
  const {hotelId} = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(1);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkIn.getDate() - search.checkOut.getDate()) + 1;

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const {data: hotel} = useQuery(
    "fetchHotelById",
    () => fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const {data: user, isLoading} = useQuery("currentUser", currentUserApi);

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-3">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel!}
      />
      <BookingForm currentUser={user!} />
    </div>
  );
}
