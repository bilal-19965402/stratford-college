import { Box, Paper, Typography, TextField, Button } from "@mui/material";

export default function ForgotPassword() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 450 }}>
        <Typography variant="h4" mb={2}>
          Forgot Password
        </Typography>

        <Typography variant="body2" mb={3}>
          Enter your email to receive a password reset link.
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Send Reset Link
        </Button>
      </Paper>
    </Box>
  );
}