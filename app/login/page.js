"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import validator from "validator";
import BackImage1 from "../../public/images/foodapp.PNG";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setError("");
    }, 1500);
    return () => clearTimeout(timeOutId);
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisable(true);
    if (email.trim() === "" || password.trim() === "") {
      setError("Fill all the fields");
      setLoading(false);
      setDisable(false);
    } else if (!validator.isEmail(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      setDisable(false);
    } else {
      try {
        axios
          .post("https://fooddelivery-kappa.vercel.app/api/users/login", {
            email,
            password,
          })
          .then((response) => {
            if (response.data.auth) {
              setLoading(false);
              setDisable(false);
              localStorage.setItem("token", response.data.token);
              router.replace("../../");
            } else if (!response.data.auth) {
              setError(response.data.msg);
              setLoading(false);
              setDisable(false);
            }
          });
      } catch (error) {}
    }
  };
  return (
    <>
      <div
        className=" h-screen  max-w-screen-2xl mx-auto flex flex-col justify-center items-center p-7 lg:p-40  bg-center bg-cover bg-no-repeat "
        style={{ backgroundImage: `url(${BackImage1.src})` }}
      >
        <div className="mb-10">
          {error && (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{error}.</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          )}
        </div>
        <div className="pt-5 pl-10 pr-5 bg-white rounded-md shadow-sm sm:w-full lg:w-[440px]  h-auto flex flex-col ">
          <div className="text-gray-900 font-normal text-xl">
            Login to your account
          </div>

          <form className="mt-6 mb-10">
            <div className="flex items-center border-b border-[#4CAF50] py-2">
              <label htmlFor="email" className="mr-2 text-[#4CAF50]">
                <FaEnvelope />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className=" flex items-center border-b border-[#4CAF50] py-2">
              <label htmlFor="password" className="mr-2 text-[#4CAF50]">
                <FaLock />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              disabled={disable}
              onClick={handleLogin}
              className="mt-6 bg-[#4CAF50] hover:bg-[#2D8A34] text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline text-center"
            >
              {" "}
              {loading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mb-10 text-center text-sm font-bold">
            No account yet?{" "}
            <span className="hover:text-[#2D8A34]">
              <Link href="./register">Create one</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
