import { loginUser } from "../../api/auth";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import "./sign-in.css";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import Logo2 from "../../assets/images/logo2.png";
import LoginImage from "../../assets/images/login-left1.png";

export default function SignInView() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setServerError("");
    setSuccessMessage("");

    let valid = true;

    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      setSuccessMessage(data.message || "Login Successful");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        setServerError(error.response.data.message || "Login failed.");
      } else if (error.request) {
        setServerError("Unable to connect to server.");
      } else {
        setServerError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-page">
      <header className="login-header">

      </header>

      <div className="login-container">
        <div className="left-panel">


          <img
            src={LoginImage}
            alt="Illustration"
            className="welcome-image"
          />
        </div>

        <div className="right-panel">
          <div className="login-form">

            <Typography className="welcome-title">
              <br />
              Welcome Back
            </Typography>

            <Typography className="welcome-subtitle">
              Hey, welcome back to your special place
            </Typography>

            {serverError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {serverError}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

            <TextField
              fullWidth
              placeholder="Email"
              variant="outlined"
              margin="normal"
              value={email}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box className="options-row">

              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <Link
                component={RouterLink}
                to="/forgot-password"
                underline="none"
                className="forgot-link"
              >
                Forgot Password?
              </Link>

            </Box>

            <Button
              className="signin-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>

            <Typography className="signup-text">
              Don't have an account?
              <Link
                component={RouterLink}
                to="/signup"
                underline="none"
              >
                {" "}Sign Up
              </Link>
            </Typography>

          </div>
        </div>
      </div>
    </Box>
  );
}