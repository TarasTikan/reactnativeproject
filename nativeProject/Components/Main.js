import { useSelector } from "react-redux";
import { useRoutes } from "../Router";
import { authSignOutUser } from "../redux/auth/authOperations";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
export const Main = () => {
      const [user, setUser] = useState(null);
    const state = useSelector((state) => state);
  const routing = useRoutes(user);
  onAuthStateChanged(auth, (user) => setUser(user));
    //   useEffect(() => {
    //   }, []);
    return <NavigationContainer>{routing}</NavigationContainer>;
}