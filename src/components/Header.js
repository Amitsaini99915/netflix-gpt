import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { LOGO } from "../utils/constants";
const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, accessToken, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            accessToken: accessToken,
            photoURL: photoURL,
          })
        );
        navigate("/browser");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  
  

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-start px-8 py-4 shadow-md">
      <div className="logo_image max-w-[180px] w-full ">
        <img
          className="w-full"
          src={LOGO}
          alt="logo"
        />
      </div>
      {user && (
        <div className="flex items-center justify-end w-full">
          <ul className="flex items-center justify-between gap-8">
            <li className="p-4 cursor-pointer">Home</li>
            <li className="p-4 cursor-pointer">TV show</li>
            <li className="p-4 cursor-pointer">Movies</li>
            <li className="p-4 cursor-pointer">New & </li>
            <li></li>
          </ul>
          <ul className="flex items-center justify-between gap-8">
            <li className="p-4 cursor-pointer">search</li>
            <div className="relative">
              <li
                className="p-4 cursor-pointer"
                onClick={() => {
                  setDropdown(!dropdown);
                }}
              >
                <img src={user?.photoURL} alt="" />
                {user?.displayName}
              </li>
              <ul
                className={`w-full bg-white shadow-lg absolute top-[100%] right-0 ${
                  dropdown ? "inline-block" : "hidden"
                }`}
              >
                <li className="px-4 py-2  cursor-pointer">Account</li>
                <li className="px-4 py-2  cursor-pointer">profile</li>
                <li
                  className="px-4 py-2  cursor-pointer"
                  onClick={handleSignOut}
                >
                  sign out
                </li>
              </ul>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
