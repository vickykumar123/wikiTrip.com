import {HotelSearchResponse, HotelType} from "backend/src/shared/types";
import {API_URL} from "../contants/contant";

export type SearchParam = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  type?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOptions?: string;
};

export async function searchApi(
  searchParams: SearchParam
): Promise<HotelSearchResponse> {
  const queryParams = new URLSearchParams();
  //set is for only one filter, append is for array of filter
  queryParams.set("destination", searchParams.destination || "");
  queryParams.set("checkIn", searchParams.checkIn || "");
  queryParams.set("checkOut", searchParams.checkOut || "");
  queryParams.set("adultCount", searchParams.adultCount || "");
  queryParams.set("childCount", searchParams.childCount || "");
  queryParams.set("page", searchParams.page || "");
  queryParams.set("maxPrice", searchParams.maxPrice || "");
  queryParams.set("sortOptions", searchParams.sortOptions || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.type?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(`${API_URL}/api/v1/hotel/search?${queryParams}`);
  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Something went wrong");
  }
  return responseBody.response;
}

export async function fetchHotelById(hotelId: string): Promise<HotelType> {
  const response = await fetch(`${API_URL}/api/v1/hotel/${hotelId}`);
  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Something went wrong");
  }
  return responseBody.hotel;
}
