import { Box, Link, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [authUser, { isLoading, error }] = useAuthUserMutation();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email().required('Email address is required'),
        password: Yup.string().required('Password is required'),
        afterSubmit: Yup.string(),
    });

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { isSubmitting },
    } = methods;

    const handleLogin = async (data) => {
        await authUser(data)
            .unwrap()
            .then((res) => {
                // const { userInfo } = { };

                dispatch(setCredentials({ ...res?.data }));
                if (res.data.role === 'admin') {
                    navigate(PATH_DASHBOARD.adminDashboard, { replace: true });
                } else if (res.data.role === 'teacher') {
                    navigate(PATH_DASHBOARD.teacherDashboard, { replace: true });
                }
            })
            .catch((err) => {
                setError('afterSubmit', {
                    type: 'validate',
                    message: err?.data?.message || err?.error,
                });
            });
    };

    useEffect(() => {
        if (userInfo) {
            if (userInfo.role === 'admin') {
                navigate(PATH_DASHBOARD.adminDashboard, { replace: true });
            } else if (userInfo.role === 'teacher') {
                navigate(PATH_DASHBOARD.teacherDashboard, { replace: true });
            }
        }
    }, [userInfo, navigate]);

    return (
        <Box className="login-page">

            {/* ================= HEADER ================= */}

            <header className="login-header">

                <img
                    src={Logo1}
                    alt="Logo"
                    className="header-logo"
                />

                <img
                    src={Logo2}
                    alt="Need Help"
                    className="header-help"
                />

            </header>

            {/* ================= MAIN ================= */}

            <div className="login-container">

                {/* ================= LEFT ================= */}

                <div className="left-panel">

                    <Typography
                        className="welcome-title"
                    >
                        Hi, Welcome Back 👋
                    </Typography>

                    <Typography
                        className="welcome-subtitle"
                    >
                        More effectively with optimized workflows.
                    </Typography>

                    <img
                        src={LoginImage}
                        alt="Illustration"
                        className="welcome-image"
                    />

                </div>

                {/* ================= RIGHT ================= */}

                <div className="right-panel">

                    <Paper
                        elevation={0}
                        className="login-card"
                    >

                        <Typography
                            className="signin-title"
                        >
                            Sign in to your account
                        </Typography>

                        <Typography
                            className="signin-subtitle"
                        >
                            Don't have an account?

                            <Link
                                href="#"
                                underline="none"
                                className="signup-link"
                            >
                                Get Started
                            </Link>

                        </Typography>

                        <div className="info-box">

                            <Typography className="info-text">
                                Use <b>demo@stratford.edu</b> with password <b>123456</b>
                            </Typography>
                        </div>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {successMessage && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {successMessage}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            value={email}
                            error={!!emailError}
                            helperText={emailError}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                                setServerError("");
                                setSuccessMessage("");
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            error={!!passwordError}
                            helperText={passwordError}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError("");
                                setServerError("");
                                setSuccessMessage("");
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 1,
                                mb: 3,
                            }}
                        >
                            <Link
                                href="#"
                                underline="hover"
                                color="inherit"
                            >
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            className="signin-button"
                            onClick={handleLogin}
                            disabled={loading}
                        >

                            {loading ? (
                                <CircularProgress
                                    size={25}
                                    color="inherit"
                                />
                            ) : (
                                "Sign In"
                            )}

                        </Button>

                    </Paper>

                </div>

            </div>

        </Box>
    );
}
