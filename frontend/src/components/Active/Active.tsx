import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Active = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/active/" + token)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  });
  return <div></div>;
};

export default Active;
