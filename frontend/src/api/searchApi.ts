import {HotelSearchResponse} from "backend/src/shared/types";
import {API_URL} from "../contants/contant";

export type SearchParam = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

export async function searchApi(
  searchParams: SearchParam
): Promise<HotelSearchResponse> {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");

  const response = await fetch(`${API_URL}/api/v1/hotel/search?${queryParams}`);
  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Something went wrong");
  }
  return responseBody.response;
}
