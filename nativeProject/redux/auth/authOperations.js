import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSignOut, authStateChange, updateUserProfile } from "./authReducer";
export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { uid, displayName } = await auth.currentUser;
      const userUpdate = { userId: uid, login: displayName };
      dispatch(updateUserProfile(userUpdate));
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdate = { userId: user.uid, login: user.displayName };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdate));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth).then()
  dispatch(authSignOut());
};
