import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import { InputField } from "../../components/ui/InputField";
import { Button } from "../../components/ui/Button";
import { login } from "../../apis";

export const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!name || !email) {
      setError("Please enter both name and email.");
      return;
    }

    setLoading(true);
    const success = await login(name, email);
    setLoading(false);

    if (success) {
      navigate("/search");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          bgcolor: "background.paper",
          textAlign: "center",
          borderRadius: 2,
          width: 500,
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Login
        </Typography>
        <InputField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Button
          label={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
