import React, { useState } from "react";
import Header from "./Header";
import { useRef } from "react";
import CheckValidateData from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTOURL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormvalidation = () => {
    let message = CheckValidateData(
      email.current.value,
      password.current.value
    );
    console.log(message, "message");
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:PHOTOURL,
          })
            .then(() => {
              const { uid, displayName, email, accessToken, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  accessToken: accessToken,
                  photoURL: photoURL,
                })
              );
              // navigate("/browser");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user, "signup successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage + errorCode, "error message");
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user, "login successfull");
          // navigate("/browser");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };
  const handleLoginForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="relative">
        <div className="relative">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="login background"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center">
          <div className="form max-w-[400px] w-full bg-black bg-opacity-50 p-10 rounded-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h2 className="text-white text-3xl mb-7">
                {isSignInForm ? "Sign In" : " Sign up"}
              </h2>
              {!isSignInForm && (
                <input
                  className="w-full py-3 px-4 bg-[#333] text-white focus-within:outline-none mb-4 rounded-md text-lg"
                  type="text"
                  placeholder="Name"
                  ref={name}
                />
              )}
              <input
                className="w-full py-3 px-4 bg-[#333] text-white focus-within:outline-none mb-4 rounded-md text-lg"
                type="email"
                placeholder="Email"
                ref={email}
              />
              <input
                className="w-full py-3 px-4 bg-[#333] text-white focus-within:outline-none mb-4 rounded-md text-lg"
                type="password"
                placeholder="Password"
                ref={password}
              />
              <p className="text-red-500 font-semibold mb-4">{errorMessage}</p>

              <button
                onClick={handleFormvalidation}
                className="py-3 px-4 bg-[#e50914] w-full text-white rounded-md text-lg"
              >
                {isSignInForm ? "Sign in" : "Sign up"}
              </button>
            </form>
            <div
              className="text-white mt-4 cursor-pointer"
              onClick={handleLoginForm}
            >
              {isSignInForm
                ? "New to Netflix? Sign up now."
                : "Alrady have an account "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
