import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "../Router";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { authStateChangeUser } from "../redux/auth/authOperations";
export const Main = () => {
      const dispatch = useDispatch()
    const { stateChange } = useSelector((state) => state.auth);
    useEffect(() => {
      dispatch(authStateChangeUser())
    }, []);
    const routing = useRoutes(stateChange);

    return <NavigationContainer>{routing}</NavigationContainer>;
}