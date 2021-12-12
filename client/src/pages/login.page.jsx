import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Modal, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSetState } from "react-use";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context";

const theme = createTheme();

export default function LoginPage() {
  const [registerFlag, setRegisterFlag] = useState(false); //useState() creates state variable
  const [failedFlag, setFailedFlag] = useState(false);
  const [state, setState] = useSetState({
    username: "",
    password: "",
    role: "student",
  });
  const [_, handleRole] = useRole();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const { username, password, role } = state;
    !registerFlag
      ? axios
          .post("http://localhost:5000/login", { username, password })
          .then((token) => {
            console.log(token);
            if ("access_token" in token.data) {
              console.log(token);
              localStorage.setItem(
                "login",
                JSON.stringify({
                  login: true,
                  token: token.data.access_token,
                  role: token.data.role,
                })
              );
              handleRole(token.data.role);
              return navigate("/");
            } else {
              setFailedFlag(true);
            }
          })
      : axios
          .post("http://localhost:5000/register", {
            username,
            password,
            role,
          })
          .then((token) => {
            if ("access_token" in token.data) {
              console.log(token);
              localStorage.setItem(
                "login",
                JSON.stringify({
                  login: true,
                  token: token.data.access_token,
                  role: token.data.role,
                })
              );
              handleRole(token.data.role);
              return navigate("/");
            } else {
              //Registration failed
            }
          });
  };

  const handleText = (e) => {
    setState({ [e.target.name]: e.target.value });
  };

  const modal_style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={failedFlag}
        onClose={() => setFailedFlag(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal_style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign in failed
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Username or password is incorrect
          </Typography>
        </Box>
      </Modal>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {!registerFlag ? "Sign in" : "Register"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {!registerFlag ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="username"
                  autoComplete="email"
                  onChange={handleText}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleText}
                />
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="username"
                  autoComplete="email"
                  onChange={handleText}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleText}
                />
                <ToggleButtonGroup
                  color="primary"
                  value={state.role}
                  exclusive
                  onChange={(event, newVal) => {
                    setState({ role: newVal });
                  }}
                  sx={{ my: "15px", width: "100%" }}
                >
                  <ToggleButton value="admin" sx={{ width: "50%" }}>
                    Admin
                  </ToggleButton>
                  <ToggleButton value="student" sx={{ width: "50%" }}>
                    Student
                  </ToggleButton>
                </ToggleButtonGroup>
              </>
            )}
            <FormControlLabel
              sx={{ width: "100%" }}
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  onClick={() =>
                    !registerFlag
                      ? handleSubmit()
                      : setRegisterFlag(!registerFlag)
                  }
                  fullWidth
                  variant={!registerFlag ? "contained" : "outlined"}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() =>
                    registerFlag
                      ? handleSubmit()
                      : setRegisterFlag(!registerFlag)
                  }
                  fullWidth
                  variant={!registerFlag ? "outlined" : "contained"}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
            {/* <Grid container>
              <Grid item xs sx={{ textAlign: "left" }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
