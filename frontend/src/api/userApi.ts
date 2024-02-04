import {UserType} from "backend/src/shared/types";
import {API_URL} from "../contants/contant";

export async function currentUserApi(): Promise<UserType> {
  const response = await fetch(`${API_URL}/api/v1/user/current-user`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }
  return responseBody.user;
}
