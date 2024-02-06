import {UserType} from "backend/src/shared/types";
import {API_URL} from "../contants/contant";
import {UpdateProfileForm} from "../pages/Profile";

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

export async function updateUserApi(formData: UpdateProfileForm) {
  const response = await fetch(`${API_URL}/api/v1/user/`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }
  return responseBody.user;
}
