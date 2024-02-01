import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {app} from "../firebaseAuth";
import {useAppDispatch} from "../redux/hooks";
import {signInUser} from "../redux/userSlice";
import {useNavigate} from "react-router";
import {useAppContext} from "../context/AppContext";
import {API_URL} from "../contants/contant";

export default function OAuth({disabled}: {disabled: boolean}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {showToast} = useAppContext();

  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
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

      const user = data.user;
      if (data.status === "success") {
        const userObj = {
          name: user.fullName,
          email: user.email,
          avatar: user.avatar,
        };
        dispatch(signInUser(userObj));
        showToast({message: "Registration Successfully!", type: "SUCCESS"});
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-violet-300 w-full p-3 rounded-md text-gray-800 font-semibold hover:bg-opacity-80 disabled:opacity-60"
      disabled={disabled}
    >
      Continue with Google
    </button>
  );
}
