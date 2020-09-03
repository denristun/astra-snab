import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function Login() {
    const [error, setError   ]  = useState(null)
  const { authToken, setAuthToken } = useAuth()
  const [isLoggedIn, setLoggedIn] = useState(false)

  const classes = useStyles()
  console.log('loginpage', authToken)

  async function fetchLogin(event) {

    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    const loginUrl = 'http://localhost:8000/api/login'
    try {
      const responseToken = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const response = await responseToken.json();

      if (response.error){
        localStorage.removeItem('token')
        setError(response.error)
      }

      if (response.token){
        setAuthToken(response.token)
        setLoggedIn(true)
      }
    } catch (e) {
    console.log(e)
    }
  }

  if (isLoggedIn || authToken) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        {
error &&
<Alert severity="error">{error}</Alert>

        }
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => {
            fetchLogin(event)
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя пользователя"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  )
}

export default Login
