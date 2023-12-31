import "./styles/Card.css";
import { Button, Typography, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState, useRef } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { userStatus } from "../states/Todos";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { snackbarState } from "../states/Todos";
import CircularProgress from '@mui/material/CircularProgress';
function Login() {
  const input2Ref = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setOpen = useSetRecoilState(snackbarState);
  const setUserStatus = useSetRecoilState(userStatus);

  async function loginuser() {
    if (email.length === 0 || password.length === 0) {
      setOpen({
        open: true,
        message: "Please fill all the fields",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/authentication/login", {
        username: email,
        password: password,
      });
      setLoading(false);
      localStorage.setItem("token", res.data.token);
      navigate("/todos");
      setUserStatus(true);
      setOpen({
        open: true,
        message: "Logged in succesfully",
        severity: "success",
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
      setOpen({
        open: true,
        message: "Invalid username or password",
        severity: "error",
      });
    }
  }

  return (
    <div className="main">
      <Card sx={{ minWidth: 280 }}>
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Welcome back ! Login to create todo
          </Typography>
          <br />
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="username or email"
            size="small"
	    disabled = {loading}
            fullWidth={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                input2Ref.current.focus();
              }
            }}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="password"
            type="password"
	    disabled = {loading}
            size="small"
            fullWidth={true}
            inputRef={input2Ref}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                loginuser();
              }
            }}
          />
          <br />
          <br />
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" disabled = {loading} onClick={loginuser}>
            {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Login'
        )}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
