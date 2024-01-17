import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();

  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browser",
      element: <Browse />,
    },
  ]);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const { uid, displayName, email, accessToken,photoURL } = user;
  //     dispatch(
  //       addUser({
  //         uid: uid,
  //         displayName: displayName,
  //         email: email,
  //         accessToken: accessToken,
  //         photoURL:photoURL,
  //       })
  //     );
  //   } else {
  //     dispatch(removeUser());
  //   }
  // });

  return (
    <div>
      <RouterProvider router={appRoutes} />
    </div>
  );
};

export default Body;
