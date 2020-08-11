/** @format */

import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import UploadFilePage from '../UploadFilePage'
import RequestPageKis from '../RequestPageKis'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import useStyles from './styles'

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            Автоматизированная система
          </Typography>
         
          <Button color='inherit' component={Link} to='/upload'>Загрузка файла</Button>
          <Button  color='inherit' component={Link} to='/requests'>Запросы</Button>
         
       
        </Toolbar>
      </AppBar>
      <div>
        <Switch>
          <Route exact path='/upload' component={UploadFilePage} />
          {/* <Route exact path='/requests' component={RequestsPage} /> */}
          <Route exact path='/requests' component={RequestPageKis} />
          <Redirect to='/' />
        </Switch>
      </div>
    </div>
  )
}

export default App
