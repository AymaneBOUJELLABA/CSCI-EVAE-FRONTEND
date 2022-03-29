import React from "react";
import {
  AccountCircle,
  Domain,
  LockClock,
  LockOutlined,
  LockRounded,
  LockSharp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import LoginIcon from "@mui/icons-material/Login";
import { fontWeight } from "@mui/system";
import { message } from "antd";
import {
  ALERT_TYPES,
  USER_FAILED_LOGIN_MESSAGE,
  USER_SUCCESS_LOGIN_MESSAGE,
} from "../../shared/constant";
//import { useAuth } from "../../context/auth";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  textField: {
    "& p": {
      color: "red",
    },
  },
}));

const onShowAlert = (msg, type) => message[type](msg);

export default function Login() {
  const [values, setValues] = React.useState({
    //email: "",
    //password: "",
    showPassword: false,
    emailIsValid: false,
    submitDisabled: true,
    passwordFilled: false,
    helperTextEmail: "",
    helperTextPassword: "",
  });
  const [role, setRole] = React.useState("");
  const [pseudo, setPseudo] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordFilled, setPasswordFilled] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [helperTextEmail, setHelperTextEmail] = React.useState("");
  const [helperTextPassword, setHelperTextPassword] = React.useState("");
  const [options, setOptions] = React.useState({
    method: "POST",

    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const auth = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const [user, setUser] = React.useState({});

  const classes = useStyles();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    console.log("email", event.target.value);
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value)) {
      console.log("success");
      setEmailIsValid(true);
      setHelperTextEmail("");
      if (passwordFilled) setSubmitDisabled(false);
      else setSubmitDisabled(true);
      console.log("hi  " + emailIsValid);
    } else {
      console.log("failure");
      setEmailIsValid(false);
      setHelperTextEmail("Veuillez entrer une adresse mail valide");
      setSubmitDisabled(true);
    }
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    console.log("password", event.target.value);
    console.log("setpassword", password);
    if (event.target.value.length >= 4) {
      console.log("filled");
      setPasswordFilled(true);
      setHelperTextPassword("");

      if (emailIsValid) {
        setSubmitDisabled(false);
      } else setSubmitDisabled(true);
    } else {
      setPasswordFilled(false);
      setSubmitDisabled(true);
      setHelperTextPassword(
        "Veuillez entrer votre mot de passe ayant au moins 4 caractères"
      );
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /*
  const emailValidate = (event) => {
    console.log("event.target.value", event.target.value);
    console.log("email", email);
    // don't remember from where i copied this code, but this works.
    if (values.emailIsValid) {
      console.log("values.emailIsValid", values.emailIsValid);
      setValues({
        ...values,
        helperTextEmail: "",
      });

      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
    } else {
      // invalid email, maybe show an error to the user.
      console.log("failure values.emailIsValid", values.emailIsValid);
      setValues({
        ...values,
        helperTextEmail: "Veuillez entrer une adresse mail valide",
      });
    }
  };

  const passwordValidate = (event) => {
    console.log("event.target.value", event.target.value);
    console.log("password", password);
    // don't remember from where i copied this code, but this works.
    if (values.passwordFilled) {
      console.log("success");
      setValues({
        ...values,
        helperTextPassword: "",
      });

      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
    } else {
      // invalid email, maybe show an error to the user.
      console.log("failure");
      setValues({
        ...values,
        helperTextPassword:
          "Veuillez entrer votre mot de passe ayant au moins 4 caractères",
      });
    }
  };
*/

  const handleClick = (event) => {
    console.log("values", values);
    console.log("password", password);
    console.log("email", email);

    console.log("event.target.value", event.target.value);

    options.body = JSON.stringify({
      idConnection: 1,
      login: email,
      pwd: password,
      pseudo: "user",
      role: "user",
      noEtudiant: null,
      noEnseignant: null,
    });

    //console.log("loading",this.state.loading);

    fetch("http://localhost:8082/api/connexion", options)
      .then((response) => {
        if (response.status == "404") {
          console.log("not found");
          setPassword("");
          setEmail("");

          console.log("event.target.value", event.target.value);
          onShowAlert(USER_FAILED_LOGIN_MESSAGE.FAILED, ALERT_TYPES.ERROR);
        } else {
          console.log("found");
          response.json().then((response) => {
            onShowAlert(USER_SUCCESS_LOGIN_MESSAGE.LOGGED, ALERT_TYPES.SUCCESS);
            setRole(response.role);
            setPseudo(response.pseudo);
            setPassword(response.pwd);
            setEmail(response.login);
            console.log("role :", role);
            console.log("response.role :", response.role);
            auth.login(
              response.login,
              response.pwd,
              response.pseudo,
              response.role
            );
            if (response.role == "ETU") navigate("/home");
            else navigate("/");
          });
        }
      }) //console.table(response.json))
      //response.json())
      /*
      .then((response) => {
        console.log("response: ", response);
        setRole(response.role);
        setPseudo(response.pseudo);
        setPassword(response.pwd);
        setEmail(response.login);
        console.log("role :", role);
        console.log("response.role :", response.role);
        //if (email == "mounir.lallali@univ-brest.fr" && password == "dosi") {
        //setAuth(user, password);
        /*
          let elt = authentifier(email);
          console.log(elt);
          elt.user ? (window.location.href = "/") : console.log("nothing");*/
      //}
      /*
        setUser(response);
        console.log("user connecté", user);
        setPassword("");
        setEmail("");
        setSubmitDisabled(true);
        //setSubmitted(true);
        console.log("event.target.value", event.target.value);
        onShowAlert(USER_FAILED_LOGIN_MESSAGE.FAILED, ALERT_TYPES.ERROR);
      })
      .catch((err) => console.error(err));
        console.log("here 1");
        auth.login(
          response.login,
          response.pwd,
          response.pseudo,
          response.role
        );
        console.log("here 2");
        //auth.user(email, password, pseudo, role);
        //setTimeout(function () {
        //console.log("auth ", auth);
        //window.location.href = "/";
        console.log("or here 3");
        console.log("logged in", auth);
        if (response.role == "ETU") navigate("/etu");
        else navigate("/");
        //}, 5000);
      })*/
      .catch((err) => console.error(err));
  };

  return (
    <Grid
      container
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        //backgroundColor: "red",
      }}
    >
      <Card
        //variant="outlined"
        style={{
          padding: "22px",
          margin: "30px",
          width: "350px",
        }}
      >
        <CardContent>
          <h3></h3>
          <Typography variant="h6" component="h3">
            {/*<LoginIcon style={{ fontSize: "25px", fontWeight: "bold" }} />
            &nbsp;&nbsp;*/}
            Identification
          </Typography>
          <br />
          <FormControl>
            <Box
              sx={{ display: "flex", alignItems: "flex-end", width: "31ch" }}
            >
              <AccountCircle
                sx={{ mr: 1, my: 0.5 }}
                style={{ fontSize: "30px" }}
                color="primary"
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                name="email"
                onChange={handleChangeEmail}
                helperText={helperTextEmail}
                // onBlur={emailValidate}
                value={email}
                required={true}
                classes={{ root: classes.textField }}
              />
            </Box>
          </FormControl>
          <br />
          {/*<FormControl>
        <Box
          sx={{ display: "flex", alignItems: "flex-end" }}
          name="password"
          id="password"
        >
          <LockRounded
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            id="password"
            name="password"
          />
          <InputLabel htmlFor="adornment-password">Password</InputLabel>

          <Input
            id="password"
            label="Mot de passe"
            variant="standard"
            type={values.showPassword ? "text" : "password"}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
        </Box>
      </FormControl>*/}
          <br />
          <FormControl>
            <Box
              sx={{ display: "flex", alignItems: "flex-end", width: "31ch" }}
            >
              <LockRounded
                sx={{ /*color: "action.active",*/ mr: 1, my: 0.5 }}
                id="password"
                name="password"
                style={{ fontSize: "30px" }}
                color="primary"
              />
              <TextField
                required={true}
                id="filled-adornment-password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                value={password}
                label="Mot de passe"
                onChange={handleChangePassword}
                helperText={helperTextPassword}
                // onBlur={passwordValidate}
                classes={{ root: classes.textField }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </FormControl>
          <br />
          <br />
          <br />
          {/*
      <Button
        variant="contained"
        //endIcon={<LoginIcon />}
        startIcon={<LockOpenIcon />}
        style={{ textAlign: "center" }}
      >
        Se connecter
      </Button>
      <br />
      <br />*/}
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            //startIcon={<LockOpenIcon />}
            style={{ textAlign: "center" }}
            color="primary"
            disabled={submitDisabled}
            onClick={handleClick}
          >
            Se connecter
          </Button>
        </CardContent>
        {/*<br />
      <br />
      <Button
        variant="contained"
        // endIcon={<LoginIcon />}
        endIcon={<LockOpenIcon />}
        style={{ textAlign: "center" }}
      >
        Se connecter
      </Button>
      <br /> <br />
      <Button
        variant="contained"
        endIcon={<LoginIcon />}
        //startIcon={<LockOpenIcon />}
        style={{ textAlign: "center" }}
      >
        Se connecter
      </Button>*/}
      </Card>
    </Grid>
  );
}
