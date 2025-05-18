import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { useAuthContext } from "../contexts/authContext";
import { useState } from "react";
import { type LoginData } from "../types/AuthInfo";

const Login = () => {
  const { login } = useAuthContext();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    login(formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="w-full h-screen"
    >
      <Paper elevation={3} className="p-8 w-full max-w-md dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5" className="text-gray-800 dark:text-white">
            Login
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            value={formData.email}
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={formData.password}
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
