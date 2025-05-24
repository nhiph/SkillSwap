import { useEffect } from "react";
import * as authService from "../services/authService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Stack, Button } from "@mui/material";

const ActivationToken = () => {
  let { activationToken } = useParams();
  const navigate = useNavigate();

  const activateAccount = () => {
    if (!activationToken) return;
    authService
      .activateUser(activationToken)
      .then(() => {
        alert("Tài khoản đã được kích hoạt!");
        navigate("/");
      })
      .catch(() => alert("Token không hợp lệ hoặc đã được dùng"));
  };

  return (
    <Stack display="flex" alignItems="center">
      <Button variant="outlined" onClick={activateAccount}>
        Outlined
      </Button>
    </Stack>
  );
};

export default ActivationToken;
