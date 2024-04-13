import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUsersFailure, loadUsersSuccess } from "../../redux/Slice/User";
import { toast } from "react-toastify";

const Logout = () => {
  const dispath = useDispatch();
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispath(loadUsersSuccess(res.data));
        toast.success("Logout successfully");
        localStorage.removeItem("token");
        window.location.href = "/";
      })
      .catch((err) => {
        dispath(loadUsersFailure(err.message));
        console.log(err.message);
        toast.error(err.message);
      });
  }, []); // eslint-disable-line
  return <div></div>;
};

export default Logout;
