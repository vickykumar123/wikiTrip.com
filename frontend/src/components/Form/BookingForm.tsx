import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {StripeCardElement} from "@stripe/stripe-js";
import {PaymentIntentResponse, UserType} from "backend/src/shared/types";
import {useForm} from "react-hook-form";
import {useSearchContext} from "../../context/SearchContext";
import {useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {createRoomBooking} from "../../api/bookingApi";
import {useAppContext} from "../../context/AppContext";

type BookingProps = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

export default function BookingForm({
  currentUser,
  paymentIntent,
}: BookingProps) {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const {hotelId} = useParams();
  const {showToast} = useAppContext();

  const {mutate: bookRoom, isLoading} = useMutation(createRoomBooking, {
    onSuccess: () => {
      showToast({message: "Booking Saved!", type: "SUCCESS"});
    },
    onError: () => {
      showToast({message: "Error saving booking", type: "ERROR"});
    },
  });

  const {handleSubmit, register} = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    console.log(result);

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({...formData, paymentIntentId: result.paymentIntent.id}); // other data will come from defaultValues or from formSubmitation
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          type="text"
          readOnly
          disabled
          {...register("email")}
        />
      </label>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500 rounded-md shadow-md shadow-slate-400"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}
