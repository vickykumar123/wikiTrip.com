import {API_URL} from "../contants/contant";
import {SignInInputs} from "../pages/SignIn";

export async function loginApi(formData: SignInInputs) {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok && responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }
  return responseBody;
}

export const logout = async () => {
  const response = await fetch(`${API_URL}/api/v1/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};