import {useAppDispatch} from "../redux/hooks";
import {signInUser} from "../redux/userSlice";
import {useNavigate, useLocation} from "react-router-dom";
import {useAppContext} from "../context/AppContext";
import {useMutation} from "react-query";
import {oauthLogin} from "../api/loginAndLogoutApi";

export default function OAuth({disabled}: {disabled: boolean}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {showToast} = useAppContext();
  const location = useLocation();

  const {mutate: data} = useMutation(oauthLogin, {
    onSuccess: (data) => {
      showToast({message: "Loggedin Successfully!", type: "SUCCESS"});
      const user = data.user;
      const userObj = {
        name: user.fullName,
        email: user.email,
        avatar: user.avatar,
      };
      dispatch(signInUser(userObj));
      navigate(location.state?.from?.pathname || "/");
      window.location.reload();
    },
    onError: (error: Error) => {
      showToast({message: `⛔ ${error}`, type: "ERROR"});
    },
  });

  function handleGoogleClick() {
    data();
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
