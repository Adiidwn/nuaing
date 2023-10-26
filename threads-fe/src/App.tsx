import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Regist from "./components/Regist";
import { apiAxios, setAuthToken } from "./library/api";
import PUser from "./pages/home/ProfileUser";
import SignIn from "./pages/home/Signin";
import TDetails from "./pages/home/ThreadDetails";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import Home from "./pages/home/Home";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const auth =useSelector
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function AuthCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await apiAxios.get("/auth/check");
      dispatch(AUTH_CHECK(response.data.user));

      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());
      setIsLoading(false);
      navigate("/auth/signin");
    }
  }
  useEffect(() => {
    if (localStorage.token) {
      AuthCheck();
    } else {
      navigate("/auth/signin");
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<TDetails />}></Route>
          <Route path="/profile/:id" element={<PUser />}></Route>
          <Route path="/auth/register" element={<Regist />}></Route>
          <Route path="/auth/signin" element={<SignIn />}></Route>
          {/* <Route path="/profileEdit/:id" element={<PEdit />}></Route> */}
        </Routes>
      )}
    </>
  );
}

export default App;
