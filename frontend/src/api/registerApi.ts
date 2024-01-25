import {API_URL} from "../contants/contant";
import {Inputs} from "../pages/Register";

export const registerApi = async (formData: Inputs) => {
  const response = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
