import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Grid, Box, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import classes from "./RPKRequestChangeDialog.module.scss";
import LinearProgress from "@material-ui/core/LinearProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';

export default class RPKRequestChangeDialog extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      filters: [],
      loading: false,
      canDelete: false,
      open: false,
      operation: {},
      formData: {
        isValid: false,
        type: "outcome",
        status: false,
      },
    };
  }

  handleShow(operation, filters) {
    this.setState({ filters: filters });
    this.setState({ open: true });
    this.setState({ canDelete: false });
    this.setState({ operation: operation });
  }
  handleClose() {
    this.setState({ filters: [] });
    this.setState({ open: false });
    this.setState({ canDelete: false });
    this.setState({ operation: {} });
  }

  async deleteButtonClicked() {
    this.setState({ loading: true });
    await this.props.deleteOperation(this.state.operation);
    this.setState({ loading: false });
    this.setState({ open: false });
  }

  async changeButtonClicked() {
    this.setState({ loading: true });
    await this.props.changeOperation(this.state.operation);
    this.setState({ loading: false });
    this.setState({ open: false });
  }

  generateClientOptions() {
    if (this.state.filters.uniqueClientList) {
      const options = this.state.filters.uniqueClientList.map((client) => {
        return (
          <MenuItem key={client} value={client}>
            {client}
          </MenuItem>
        );
      });
      return options;
    }
  }

  generateOrganizationOptions() {
    if (this.state.filters.uniqueOrganizationList) {
      const options = this.state.filters.uniqueOrganizationList.map((organization) => {
        return (
          <MenuItem key={organization} value={organization}>
            {organization}
          </MenuItem>
        );
      });
      return options;
    }
  }

  render() {
    return (
      <div className={classes.RPKRequestChangeDialog}>
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
            className={classes.RPKRequestChangeDialog__title}
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
                <Box key="operationRequest" mb={2}>
                  <TextField
                    defaultValue={this.state.operation.request}
                    autoFocus={false}
                    name="request"
                    fullWidth={true}
                    id="requestFormInput"
                    label="Номер заявки"
                    type="text"
                    multiline={false}
                    rowsMax={1}
                    variant="filled"
                    helperText=""
                    onChange={(event) => {
                      const changedOperation = this.state.operation;
                      changedOperation.request = event.target.value;
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
                {/* <Box key="operationClient" mb={2}>
                  <TextField
                    defaultValue={this.state.operation.client}
                    autoFocus={false}
                    name="client"
                    fullWidth={true}
                    id="clientFormInput"
                    label="Контрагент"
                    type="text"
                    multiline={false}
                    rowsMax={1}
                    variant="filled"
                    helperText=""
                  />
                </Box> */}
                {/* <Box key="operationOrganization" mb={2}>
                  <TextField
                    defaultValue={this.state.operation.organization}
                    autoFocus={false}
                    name="organization"
                    fullWidth={true}
                    id="organizationFormInput"
                    label="Организация"
                    type="text"
                    multiline={false}
                    rowsMax={1}
                    variant="filled"
                    helperText=""
                    onChange={(event) => {
                      const changedOperation = this.state.operation;
                      changedOperation.organization = event.target.value;
                      this.setState({ operation: changedOperation });
                    }}
                  />
                </Box> */}
                <Box key="operationComment" mb={2}>
                  <TextField
                    defaultValue={this.state.operation.comment} 
                    autoFocus={false}
                    name="comment"
                    fullWidth={true}
                    id="commentFormInput"
                    label="Комментарий"
                    type="text"
                    multiline={false}
                    rowsMax={1}
                    variant="filled"
                    helperText=""
                    onChange={(event) => {
                      const changedOperation = this.state.operation;
                      changedOperation.comment = event.target.value;
                      this.setState({ operation: changedOperation });
                    }}
                  />
                </Box>

                <Box key="clientSelectRequest" mb={2}>
                <InputLabel id="demo-controlled-open-select-label">Контрагент</InputLabel>
                  <Select
                    labelId="client-select-label"
                    id="client-select"
                    fullWidth={true}
                    variant="filled"
                    label="Клиент"
                    value={this.state.operation.client || ''}
                    onChange={(event) => {
                        const changedOperation = this.state.operation;
                        changedOperation.client = event.target.value;
                        this.setState({ operation: changedOperation });
                      }}
                  >
                    {this.generateClientOptions()}
                  </Select>
                </Box>
             
             
                <Box key="organizationSelectRequest" mb={2}>
                <InputLabel id="demo-controlled-open-select-label">Организация</InputLabel>
                  <Select
                   label="Организация"
                    labelId="organization-select-label"
                    id="organization-select"
                    fullWidth={true}
                    value={this.state.operation.organization || ''}
                    onChange={(event) => {
                        const changedOperation = this.state.operation;
                        changedOperation.organization = event.target.value;
                        this.setState({ operation: changedOperation });
                      }}
                  >
                    {this.generateOrganizationOptions()}
                  </Select>
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
    );
  }
}
