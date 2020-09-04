/** @format */

import React, { useState } from "react";
import { Switch, Route, Redirect, Link, Router } from "react-router-dom";
import UploadFilePage from "../UploadFilePage";
import RequestPageKis from "../RequestPageKis";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PrivateRoute from '../../routes/PrivateRoute';
import useStyles from "./styles";
import ToTopArrow from "../ToTopArrow";
import { AuthContext } from "../../context/auth";
import LoginPage from "../LoginPage";

import RequestPageMeh from "../RequestPageMeh";




const App: React.FC = () => {
  const existingToken = JSON.parse(localStorage.getItem("token"));
  const [authToken, setAuthToken] = useState(existingToken);
  

  const setToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  }


  

  const classes = useStyles();

  return (
    <AuthContext.Provider value={{  authToken: authToken, setAuthToken: setToken }}>
      
    <div className={classes.root}>
      <div className="headerKis">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" className={classes.title}>
              Автоматизированная система
            </Typography>
            <Button color="inherit" component={Link} to="/upload">
              Загрузка файла
            </Button>
            <Button color="inherit" component={Link} to="/requests">
              Запросы
            </Button>
            <Button color="inherit" component={Link} to="/requests-new">
              Запросы новые
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <div>
          <PrivateRoute exact path="/upload" component={UploadFilePage} />
          {/* <Route exact path='/requests' component={RequestsPage} /> */}
          <PrivateRoute exact path="/requests" component={RequestPageKis} />
          <PrivateRoute exact path="/requests-new" component={RequestPageMeh} />
          <Route exact path="/login" component={LoginPage} />
          <Redirect to="/login" />
      </div>

      <ToTopArrow />

    </div>
    
    </AuthContext.Provider>
  );
};

export default App;
