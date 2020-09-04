import React from 'react'
import classes from './RPKRequestChangeStatus.module.scss'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import { Grid, Box, TextField, Checkbox } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import LinearProgress from '@material-ui/core/LinearProgress'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default class RPKRequestChangeStatus extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      open: false,
      operation: {},
    };

    this.newStatusValue = '';
    this.checkbox = false;
  }

  openChangeStatusForm = (operation) => {
    // console.log(operation);
    this.setState({
      operation,
      open: !this.state.open
    });
  }

  handleClose = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  changeStatusHandler = (operationId, value) => {}

  changeButtonClicked = () => {}

  checkBoxHandler = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div className={classes.RPKRequestChangeStatus}>
        <Dialog
          open={this.state.open}
          // onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth={true}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.RPKRequestChangeStatus__title}
          >
            <Box m={2}>
              <h3>
                Изменить статус операции: <span>{this.props.request}</span>
              </h3>
            </Box>
            <Box mr={2}>
              <i
                className="fa fa-times fa-2x"
                style={{ cursor: 'pointer' }}
                onClick={() => this.handleClose()}
              ></i>
            </Box>
          </Grid>
          {this.state.loading && <LinearProgress />}
          <Grid className={classes.RPKRequestChangeStatus__content}>
            <Box>
              <Autocomplete
                freeSolo
                key={this.state.operation._id}
                name={this.state.operation._id}
                options={
                  this.props.uniqueStatusList.length > 0
                    ? this.props.uniqueStatusList
                    : []
                }
                defaultValue={
                  this.state.operation.status !== ''
                    ? this.state.operation.status
                    : ''
                }
                fullWidth={true}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Введите статус"
                    variant="filled"
                  />
                )}
                onInputChange={(event, value) =>
                  this.changeStatusHandler(this.state.operation._id, value)
                }
              />
            </Box>
            <Box>
              <Checkbox
                color="primary"
                onChange={event => this.checkBoxHandler(event.target.checked)}
              />
            </Box>
          </Grid>
          <DialogActions>
            <Button
              id="formButton"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={() => this.changeButtonClicked()}
            >
              Изменить статус
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
