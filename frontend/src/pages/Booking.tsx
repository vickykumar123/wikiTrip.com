import {useQuery} from "react-query";
import {currentUserApi} from "../api/userApi";
import BookingForm from "../components/Form/BookingForm";
import {useSearchContext} from "../context/SearchContext";
import {useParams} from "react-router-dom";
import {fetchHotelById} from "../api/searchApi";
import {useEffect, useState} from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import {createPaymentIntent} from "../api/bookingApi";
import {Elements} from "@stripe/react-stripe-js";
import {useAppContext} from "../context/AppContext";

export default function Booking() {
  const {stripePromise} = useAppContext();
  const search = useSearchContext();
  const {hotelId} = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkIn.getDate() - search.checkOut.getDate()) + 1;

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const {data: paymentIntentData, isLoading: paymentLoading} = useQuery(
    "createPaymentIntent",
    () => createPaymentIntent(hotelId as string, numberOfNights.toString()),
    {
      enabled: !!hotelId && numberOfNights > 0, //this will retry only these condition mets
    }
  );

  const {data: hotel, isLoading: hotelLoading} = useQuery(
    "fetchHotelById",
    () => fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const {data: user, isLoading} = useQuery("currentUser", currentUserApi);

  if (isLoading || hotelLoading || paymentLoading) return <div>Loading</div>;
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
      {paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm currentUser={user!} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  );
}
