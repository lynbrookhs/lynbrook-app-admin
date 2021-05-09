import {
  Avatar,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import firebase from "firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "reactfire";
import Spinner from "~/components/Spinner";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {error && (
          <Alert severity="error" className={classes.error}>
            {error}
          </Alert>
        )}
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={handleSignIn}
        >
          Sign in with Google
        </Button>
      </div>
    </Container>
  );
};

const Index = () => {
  const auth = useAuth();
  const router = useRouter();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/dashboard");
      } else {
        setReady(true);
      }
    });
  }, []);

  if (ready) {
    return <Login />;
  } else {
    return <Spinner />;
  }
};

export default Index;
