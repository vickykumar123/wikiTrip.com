import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {API_URL} from "../contants/contant";
import {SignInInputs} from "../pages/SignIn";
import {app} from "../firebaseAuth";

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

export async function oauthLogin() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const result = await signInWithPopup(auth, provider);
  const res = await fetch(`${API_URL}/api/v1/auth/google`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: result.user.displayName,
      email: result.user.email,
      avatar: result.user.photoURL,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return data;
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
