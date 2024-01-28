import {API_URL} from "../contants/contant";

export async function addMyHotel(hotelFormData: FormData) {
  const response = await fetch(`${API_URL}/api/v1/hotel/create-hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  const responseBody = await response.json();
  if (!response.ok && responseBody.status === "failed") {
    throw new Error("Unable to create the hotel");
  }
  return responseBody;
}
