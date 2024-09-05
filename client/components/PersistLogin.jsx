import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/auth/authSlice";
import { useRefreshMutation } from "@/redux/auth/authApiSlice";
import Nav from "@/pages/dashboard/_components/Nav";
import SideNav from "@/pages/dashboard/_components/SideNav";

const PersistLogin = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;

  if (isLoading) {
    //token: no
    console.log("loading");
    content = <p className="text-light-1">Loading...</p>;
  } else if (isError) {
    //token: no
    console.log("error");
    content = (
      <p className="">
        {`${error?.data?.message} - `}
        <Link href="/login" className="text-light-1">
          Please login again
        </Link>
        .
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //token: yes
    console.log("success");

    content = (
      <div>
        <Nav />
        <SideNav />
        <div className="p-4 sm:ml-64 mt-20">{children}</div>
      </div>
    );
  } else if (token && isUninitialized) {
    //token: yes
    console.log("token and uninit");
    console.log(isUninitialized);

    content = (
      <div>
        <Nav />
        <SideNav />
        <div className="p-4 sm:ml-64 mt-20">{children}</div>
      </div>
    );
  }

  return content;
};
export default PersistLogin;
