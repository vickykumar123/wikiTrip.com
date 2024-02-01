import {HotelType} from "backend/src/shared/types";
import {API_URL} from "../contants/contant";

export async function addMyHotel(hotelFormData: FormData) {
  const response = await fetch(`${API_URL}/api/v1/my-hotel/create-hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Unable to create the hotel");
  }
  return responseBody;
}

export async function myHotel(): Promise<HotelType[]> {
  const response = await fetch(`${API_URL}/api/v1/my-hotel/`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody.myHotel;
}

export async function hotelById(hotelId: string): Promise<HotelType> {
  const response = await fetch(`${API_URL}/api/v1/my-hotel/${hotelId}`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }

  return responseBody.hotel;
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_URL}/api/v1/my-hotel/${hotelFormData.get("hotelId")}`,
    {
      method: "PATCH",
      body: hotelFormData,
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Failed to update Hotel");
  }

  return responseBody.hotel;
};
