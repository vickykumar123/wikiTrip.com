import {API_URL} from "../contants/contant";

export async function validateToken() {
  const response = await fetch(`${API_URL}/api/v1/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  // const responseBody = await response.json();

  return response.json();
}
