import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile } from "./authReducer";
export const authSignUpUser = ({ email, password, login }) => async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password, login);
         const user = await auth.currentUser;
         user.updateProfile({
           displayName: login
         });
         const {uid, displayName} = await auth.currentUser;
       dispatch(
         updateUserProfile({
           userId: uid,
           login: displayName,
         })
       );
    } catch (error) {
        console.log('error', error.message)
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

export const authSignOutUser = () => async (dispatch, getState) => {};
