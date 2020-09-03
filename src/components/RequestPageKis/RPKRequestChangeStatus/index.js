import React from 'react';
import classes from './RPKRequestChangeStatus.module.scss';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Grid, Box, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LinearProgress from "@material-ui/core/LinearProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class RPKRequestChangeStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      uniqueValues: [],
      loading: false,
      open: false,
      operation: {},
      formData: {
        isValid: false,
        type: "outcome",
        status: false,
      },
    };
  }

  render() {
    return (
      <div className={classes.RPKRequestChangeStatus}>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
          fullWidth={true}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.RPKRequestChangeStatus__title}
          >
            <Box ml={1}>
              <h3>Изменить операцию</h3>
            </Box>
            <Box mr={0.5}>
              <i
                className="fa fa-times fa-2x"
                onClick={() => this.handleClose()}
              ></i>
            </Box>
          </Grid>
          <DialogContent>
            {this.state.loading && <LinearProgress />}
            <form autoComplete="off">
              <Grid className={classes.RPKRequestChangeDialog__content}>

                <Box key="requestSelectRequest" mb={2}>
                  <Autocomplete
                    id="combo-box-request"
                    options={
                this.state.uniqueValues.uniqueRequests
                    }
                    freeSolo
                    value={this.state.operation.request || ""}
                    getOptionLabel={(option) => option}
                    fullWidth={true}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Номер заявки"
                        variant="filled"
                      />
                    )}
                    onChange={(event, newInputValue) => {
                      const changedOperation = this.state.operation;
                      changedOperation.request = newInputValue;
                      this.setState({ operation: changedOperation });
                    }}
                  />
                </Box>

                <Box key="operationValue" mb={2}>
                  <TextField
                    defaultValue={this.state.operation.value}
                    autoFocus={false}
                    name="value"
                    fullWidth={true}
                    id="valueFormInput"
                    label="Количество"
                    type="number"
                    multiline={false}
                    rowsMax={1}
                    variant="filled"
                    helperText=""
                    onChange={(event) => {
                      const changedOperation = this.state.operation;
                      changedOperation.value = parseFloat(event.target.value);
                      this.setState({ operation: changedOperation });
                    }}
                  />
                </Box>
          
                <Box key="clientSelectRequest" mb={2}>
                  <Autocomplete
                    id="combo-box-client"
                    options={
                        this.state.uniqueValues.uniqueClients
                    }
                    freeSolo
                    value={this.state.operation.client || ""}
                    getOptionLabel={(option) => option}
                    fullWidth={true}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Контрагент"
                        variant="filled"
                      />
                    )}
                    onChange={(event, newInputValue) => {
                      const changedOperation = this.state.operation;
                      changedOperation.client = newInputValue;
                      this.setState({ operation: changedOperation });
                    }}
                  />
                </Box>
                <Box key="organizationSelectRequest" mb={2}>
                  <Autocomplete
                    id="combo-box-organization"
                    options={this.state.uniqueValues.uniqueOrganizations}
                    freeSolo
                    variant="filled"
                    value={this.state.operation.organization || ""}
                    getOptionLabel={(option) => option}
                    fullWidth={true}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Организация"
                        variant="filled"
                      />
                    )}
                    onChange={(event, newInputValue) => {
                      const changedOperation = this.state.operation;
                      changedOperation.organization = newInputValue;
                      this.setState({ operation: changedOperation });
                    }}
                  />
                </Box>
                <Box key="operationComment" mb={2}>
                  <TextField
                    defaultValue={this.state.operation.comment}
                    autoFocus={false}
                    name="comment"
                    fullWidth={true}
                    id="commentFormInput"
                    label="Комментарий"
                    type="text"
                    multiline={true}
                    rowsMax={5}
                    variant="filled"
                    helperText=""
                    onChange={(event) => {
                      const changedOperation = this.state.operation;
                      changedOperation.comment = event.target.value;
                      this.setState({ operation: changedOperation });
                    }}
                  />
                </Box>
              </Grid>

              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                className={classes.RPKRequestChangeDialog__button}
              ></Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              id="formButton"
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              startIcon={<DeleteForeverIcon />}
              onClick={() => this.setState({ canDelete: true })}
            >
              Удалить запись
            </Button>
            <Button
              hidden={!this.state.canDelete}
              id="formButton"
              variant="outlined"
              color="secondary"
              size="large"
              className={classes.button}
              startIcon={<DeleteForeverIcon />}
              onClick={() => this.deleteButtonClicked()}
            >
              Удалить?
            </Button>

            <Button
              id="formButton"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={() => this.changeButtonClicked()}
            >
              Изменить запись
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}