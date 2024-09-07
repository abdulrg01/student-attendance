import { selectCurrentToken } from "@/redux/auth/authSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Grade({ selectedGrad }) {
  const token = useSelector(selectCurrentToken)
  useEffect(() => {
    selectedGrad("5th")
  }, [token])

  return (
    <div>
      <select
        onChange={(e) => selectedGrad(e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value={"5th"}>5th</option>
        <option value={"6th"}>6th</option>
        <option value={"7th"}>7th</option>
      </select>
    </div>
  );
}
