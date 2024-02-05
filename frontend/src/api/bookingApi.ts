import {PaymentIntentResponse} from "backend/src/shared/types";
import {API_URL} from "../contants/contant";
import {BookingFormData} from "../components/Form/BookingForm";

export async function createPaymentIntent(
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> {
  const response = await fetch(
    `${API_URL}/api/v1/booking/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({numberOfNights}),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Error in payment-intent");
  }
  return responseBody.response;
}

export async function createRoomBooking(formData: BookingFormData) {
  const response = await fetch(
    `${API_URL}/api/v1/booking/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Unable to book the room.");
  }

  return responseBody.message;
}
