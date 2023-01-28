import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
import { uploadPhoto } from "../../firebase/uploadPhoto";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const { updateUserProfile, authSignOut, setErrorMessage } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login, photoUri }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userAvatarUrl = await uploadPhoto(
        photoUri,
        "avatars",
        `${user.uid}.jpg`
      );

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: userAvatarUrl,
      });

      const userUpdateProfile = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      dispatch(setErrorMessage({ error: error.message }));
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userUpdateProfile = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      dispatch(setErrorMessage({ error: error.message }));
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    dispatch(setErrorMessage({ error: error.message }));
  }
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };

        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    dispatch(setErrorMessage({ error: error.message }));
  }
};

// import db from "../../firebase/config";
// import { authSlice } from "./authReducer";

// export const authSignUpUser =
//   ({ email, password, nickname }) =>
//   async (dispatch, getState) => {
//     try {
//       await db.auth().createUserWithEmailAndPassword(email, password);

//       const user = await db.auth().currentUser;

//       await user.updateProfile({
//         displayName: nickname,
//       });

//       const { displayName, uid } = await db.auth().currentUser;

//       const userUpdateProfile = {
//         nickName: displayName,
//         userId: uid,
//       };

//       dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
//     } catch (error) {
//       console.log("error", error);

//       console.log("error.message", error.message);
//     }
//   };

// export const authSignInUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       const user = await db.auth().signInWithEmailAndPassword(email, password);
//       console.log("user", user);
//     } catch (error) {
//       console.log("error", error);
//       console.log("error.code", error.code);
//       console.log("error.message", error.message);
//     }
//   };

// export const authSignOutUser = () => async (dispatch, getState) => {};

// export const authStateCahngeUser = () => async (dispatch, getState) => {
//   await db.auth().onAuthStateChanged((user) => setUser(user));
// };
