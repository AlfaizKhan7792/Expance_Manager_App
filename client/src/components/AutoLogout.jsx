import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../features/Auth/AuthSlice";

const AutoLogout = () => {
  const { All_Users } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    // ✅ Function to reset timeout
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (All_Users) {
          dispatch(LogoutUser()); // Redux se logout karein
          navigate("/login"); // Login page per redirect karein
        }
      }, 5 * 60 * 1000); // 5 minutes (300,000 milliseconds)
    };

    // ✅ Event Listeners for User Activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // ✅ Initial Timer Start
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [All_Users, dispatch, navigate]);

  return null; // ✅ Ye component UI me kuch render nahi karega
};

export default AutoLogout;
