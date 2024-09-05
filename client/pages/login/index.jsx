import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/redux/auth/authApiSlice";
import { setCredentials, setUser } from "@/redux/auth/authSlice";

export default function LoginPage() {
  const errRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  // const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  // useEffect(() => {
  //   if (session) {
  //     router.push("/");
  //   }
  // }, [session]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token }));
      dispatch(setUser({ user }));
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
      console.log(err);
    }
  };

  const errClass = errMsg ? "border-red-500" : "border-red-500";

  return (
    <div className="bg-purple-100 py-6">
      <div className="max-w-[25rem] w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 bg-white shadow-xl shadow-slate-400">
        <div className="flex flex-row gap-2 items-center mb-5">
          <img
            src="/logo-icon.png"
            alt="logo"
            className="w-6 h-4 text-gray-950"
          />
          <p className="text-[18px] text-gray-900 font-bold">schoolcn</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[18px] text-gray-900 font-bold">Sign in</h1>
          <p className="text-gray-500 text-[12px] font-bold">
            to continue to schoolcn
          </p>
        </div>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <div
            // onClick={() => signIn("google")}
            className="flex flex-row gap-1 items-center my-6 rounded-md py-3 px-4 border-[1px] border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            <FcGoogle size={20} className="mr-2" />
            <p className="text-gray-500 text-[12px] font-bold">
              Continue with Google
            </p>
          </div>
          <div className="flex flex-row items-center">
            <div className="h-[1px] w-full bg-slate-300"></div>
            <p className="text-gray-900 mb-2 px-2">or</p>
            <div className="h-[1px] w-full bg-slate-300"></div>
          </div>

          <label
            htmlFor="email"
            className="bg-transparent block mt-7 text-[13px] font-bold text-gray-600"
          >
            Email address
          </label>
          <input
            type="email"
            onChange={handleEmailInput}
            value={email}
            name="email"
            id="email"
            className="bg-transparent border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          <div className="w-full relative mt-3">
            <label
              htmlFor="password"
              className="bg-transparent block text-[13px] font-bold text-gray-600"
            >
              Password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={password}
              onChange={handlePwdInput}
              id="password"
              className="bg-transparent border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 text-black cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 text-black cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          <div className=" w-full mt-5">
            <input
              type="submit"
              value="Login"
              className="rounded-lg text-white hover:bg-blue-800 bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer min-h-[45px] w-full text-[16px] font-Poppins font-semibold"
            />
          </div>
          <h5 className="pt-5 text-[13px] text-gray-500 font-semibold">
            No account?{" "}
            <span
              className="text-blue-900 font-semibold text-[13px] pt-1 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </h5>
        </form>
      </div>
    </div>
  );
}
