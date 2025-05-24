import { useEffect } from "react";
import * as authService from "../services/authService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ActivationToken = () => {
  let { activationToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (activationToken) {
      authService
        .activateUser(activationToken)
        .then(() => {
          alert("Tài khoản đã được kích hoạt!");
          navigate("/login");
        })
        .catch(() => alert("Token không hợp lệ hoặc đã được dùng"));
    }
  }, [activationToken]);

  return <p>Đang kích hoạt tài khoản...</p>;
};

export default ActivationToken;
