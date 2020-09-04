import React from "react";
import ReactDOM from "react-dom";
import classes from "./RPKOutcomePage.module.scss";
import "font-awesome/css/font-awesome.min.css";

// import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

let insertClasses = [classes.RPKOutcomePage];

export default class RPKOutcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.modal = document.createElement("div");
    this.state = {
      formData: {
        isValid: false,
        type: "outcome",
        status: false,
        textFields: {
          value: {
            key: Math.random(),
            autoFocus: false,
            name: "value",
            fullWidth: true,
            id: "outcomeFormInput",
            label: "Расход",
            type: "number",
            multiline: false,
            rowsMax: 1,
            defaultValue: "",
            variant: "filled",
            touched: false,
            isValid: false,
            validation: {
              required: true,
              minLength: 1,
            },
            helperText: "",
            error: false,
          },
          organization: {
            key: Math.random(),
            name: "organization",
            fullWidth: true,
            id: "outcomeFormInput",
            label: "Организация",
            type: "autocomplete",
            multiline: false,
            rowsMax: 1,
            defaultValue: "",
            variant: "filled",
            touched: false,
            isValid: false,
            validation: {
              required: true,
              minLength: 3,
            },
            helperText: "",
            autoFocus: false,
            error: false,
          },
          client: {
            key: Math.random(),
            name: "client",
            fullWidth: true,
            id: "outcomeFormInput",
            label: "Контрагент",
            type: "autocomplete",
            multiline: false,
            rowsMax: 1,
            defaultValue: "",
            variant: "filled",
            touched: false,
            isValid: false,
            validation: {
              required: true,
              minLength: 3,
            },
            helperText: "",
            autoFocus: false,
            error: false,
          },
          destination: {
            key: Math.random(),
            name: "destination",
            fullWidth: true,
            id: "outcomeFormInput",
            label: "Назначение платежа",
            type: "multiline",
            multiline: true,
            rowsMax: 4,
            defaultValue: "",
            variant: "filled",
            touched: false,
            isValid: true,
            validation: {
              required: true,
              minLength: 3,
            },
            helperText: "",
            autoFocus: false,
            error: false,
          },
          comment: {
            key: Math.random(),
            name: "comment",
            fullWidth: true,
            id: "outcomeFormInput",
            label: "Комментарий",
            type: "multiline",
            multiline: true,
            rowsMax: 4,
            defaultValue: "",
            variant: "filled",
            touched: false,
            isValid: false,
            validation: {
              required: true,
              minLength: 3,
            },
            helperText: "",
            autoFocus: false,
            error: false,
          },
        },
      },
    };
  }

  componentDidMount() {
    document.body.appendChild(this.modal);
    // this.setListeners();
  }

  componentWillUnmount() {
    document.body.removeChild(this.modal);
  }

  buttonLoaderActivator = (prop) => {
    switch (prop) {
      case "show":
        document.querySelector("#formButton").style.display = "none";
        document.querySelector(".lds-dual-ring").style.display = "block";
        break;
      case "hide":
        document.querySelector("#formButton").style.display = null;
        document.querySelector(".lds-dual-ring").style.display = "none";
        break;
      default:
        break;
    }
  };

  getFormatDate = (date) => {
    let day = date.getDate().toString();
    let month = (date.getMonth()+1).toString();
    let year = date.getFullYear().toString();

    if (day.length < 2) {
      day = "0" + day;
    }
    if (month.length < 2) {
      month = "0" + month;
    }

    return day + "." + month + "." + year;
  };

  validateForm = () => {
    const state = this.state;
    const textFields = state.formData.textFields;
    // console.log(this.state.formData.textFields);
    let isFormValid = true;
    Object.keys(textFields).forEach((key) => {
      const textField = textFields[key];
      const validations = this.textFieldValidation(
        textField.defaultValue,
        textField.validation
      );
      isFormValid = isFormValid && validations.isValid;

      textField.touched = true;
      textField.defaultValue = textFields[key].defaultValue;
      textField.isValid = validations.isValid;
      textField.isValid === false
        ? (textField.helperText = validations.validationFailedMessage)
        : (textField.helperText = "");

      // console.log(textField);

      textField.key = Math.random();
      state.formData.textFields[key] = { ...textField };
    });

    this.setState({
      formData: state.formData,
    });

    // console.log(this.state.formData.textFields);
    return isFormValid;
  };

  addButtonClicked = () => {
    this.buttonLoaderActivator("show");
    const formDataValid = this.validateForm();
    // console.log(formData);
    if (formDataValid) {
      const stateTextFields = this.state.formData.textFields;
      let formTextFields = {};
      Object.keys(stateTextFields).forEach((key) => {
        formTextFields[key] = stateTextFields[key].defaultValue;
      });
      formTextFields.value = +(+formTextFields.value).toFixed(2);
      formTextFields.request = this.props.request;
      formTextFields.date = this.getFormatDate(new Date());
      formTextFields.status = false;
      formTextFields.type = "outcome";

      this.props.addOutcomeOperation(formTextFields);
    }

    // this.props.closeModal();
    // this.resetTextfields();
    // this.buttonLoaderActivator("hide");
  };

  resetTextfields = () => {
    const formData = this.state.formData;
    Object.keys(formData.textFields).forEach(key => {
      formData.textFields[key].defaultValue = '';
    });

    this.setState({formData});
  }

  textFieldValidate = (textFieldName, value) => {
    const state = this.state;
    const textField = state.formData.textFields[textFieldName];

    if (textField.type === "number") {

      if (value === '') { //При наличии . в инпуте
        return;
      }

      textField.touched = true;
      textField.defaultValue = value.toString();
      const validations = this.textFieldValidation(value, textField.validation);
      textField.isValid = validations.isValid;
      textField.isValid === false
        ? (textField.helperText = validations.validationFailedMessage)
        : (textField.helperText = "");
      textField.autoFocus = true;
      // console.log(textField);

      textField.key = Math.random();
      state.formData.textFields[textFieldName] = { ...textField };
    } else {
      textField.defaultValue = value;
      if (textField.type === "autocomplete") {
        textField.key = Math.random();
      }
    }

    this.setState({
      formData: state.formData,
    });

    // console.log(this.state.formData.textFields[textFieldName]);
  };

  textFieldValidation = (value, validations) => {
    let isValid = true;
    let validationFailedMessage = "";

    if (value === null) {
      value = "";
    }

    Object.keys(validations).forEach((validation) => {
      if (validation === "required") {
        isValid = value.trim().length >= 0 && isValid;
        isValid === false
          ? (validationFailedMessage = "Поле не заполнено")
          : (validationFailedMessage = "");
      }
      if (validation === "minLength") {
        isValid = value.trim().length >= validations[validation] && isValid;
        isValid === false
          ? (validationFailedMessage =
              "Недостаточно символов. Минимум: " + validations[validation])
          : (validationFailedMessage = "");
      }
    });

    return { isValid, validationFailedMessage };
  };

  render() {
    // console.log(this.props.uniqueValues);
    return ReactDOM.createPortal(
      <div className={insertClasses.join(" ")}>
        <div className="backdrop">
          <div className="modal">
            <form autoComplete="off">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.RPKOutcomePage__title}
              >
                <Box ml={1}>
                  <h3>
                    Добавить расход к заявке: <span>{this.props.request}</span>
                  </h3>
                </Box>
                <Box mr={0.5}>
                  <i
                    className="fa fa-times fa-2x"
                    onClick={() => this.props.closeModal()}
                  ></i>
                </Box>
              </Grid>
              <Grid className={classes.RPKOutcomePage__content}>
                <Box mb={2}>
                  <TextField
                    key={this.state.formData.textFields.value.key}
                    name={this.state.formData.textFields.value.name}
                    type={this.state.formData.textFields.value.type.toString()}
                    fullWidth={this.state.formData.textFields.value.fullWidth}
                    autoFocus={this.state.formData.textFields.value.autoFocus}
                    id={
                      this.state.formData.textFields.value.id +
                      this.state.formData.textFields.value.key.toString()
                    }
                    label={this.state.formData.textFields.value.label}
                    rowsMax={this.state.formData.textFields.value.rowsMax}
                    defaultValue={
                      this.state.formData.textFields.value.defaultValue
                    }
                    variant={this.state.formData.textFields.value.variant}
                    touched={this.state.formData.textFields.value.touched.toString()}
                    error={
                      this.state.formData.textFields.value.touched
                        ? !this.state.formData.textFields.value.isValid
                        : this.state.formData.textFields.value.touched
                    }
                    helperText={this.state.formData.textFields.value.helperText}
                    onChange={(event) =>
                      this.textFieldValidate(
                        this.state.formData.textFields.value.name,
                        event.target.value
                      )
                    }
                  />
                </Box>
                <Box mb={2}>
                  <Autocomplete
                    // freeSolo
                    // disableClearable
                    key={this.state.formData.textFields.organization.key}
                    name={this.state.formData.textFields.organization.name}
                    fullWidth={this.state.formData.textFields.organization.fullWidth}
                    id={
                      this.state.formData.textFields.organization.id +
                      this.state.formData.textFields.organization.key.toString()
                    }
                    label={this.state.formData.textFields.organization.label}
                    variant={this.state.formData.textFields.organization.variant}
                    defaultValue={
                      this.state.formData.textFields.organization.defaultValue
                    }
                    options={this.props.uniqueValues.uniqueOrganizations.map(
                      (option) => option
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={this.state.formData.textFields.organization.label}
                        margin="normal"
                        variant={this.state.formData.textFields.organization.variant}
                        InputProps={{ ...params.InputProps }}
                      />
                    )}
                    onChange={(event, newInputValue) =>
                      this.textFieldValidate(
                        this.state.formData.textFields.organization.name,
                        newInputValue
                      )
                    }
                    // onInputChange={(event, value) =>
                    //   this.textFieldValidate(
                    //     this.state.formData.textFields.client.name,
                    //     value
                    //   )
                    // }
                  />
                  {!this.state.formData.textFields.organization.isValid &&
                  this.state.formData.textFields.organization.touched ? (
                    <div
                      style={{
                        color: "#f44336",
                        display: "block",
                        fontSize: "0.75rem",
                        marginLeft: 14,
                        marginRight: 14,
                      }}
                    >
                      Поле "{this.state.formData.textFields.organization.label}" не заполнено!
                    </div>
                  ) : (
                    ""
                  )}
                </Box>
                <Box mb={2}>
                  <Autocomplete
                    // freeSolo
                    // disableClearable
                    key={this.state.formData.textFields.client.key}
                    name={this.state.formData.textFields.client.name}
                    fullWidth={this.state.formData.textFields.client.fullWidth}
                    id={
                      this.state.formData.textFields.client.id +
                      this.state.formData.textFields.client.key.toString()
                    }
                    label={this.state.formData.textFields.client.label}
                    variant={this.state.formData.textFields.client.variant}
                    defaultValue={
                      this.state.formData.textFields.client.defaultValue
                    }
                    helpertext={
                      this.state.formData.textFields.client.helperText
                    }
                    options={this.props.uniqueValues.uniqueClients.map(
                      (option) => option
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={this.state.formData.textFields.client.label}
                        margin="normal"
                        variant={this.state.formData.textFields.client.variant}
                        InputProps={{ ...params.InputProps }}
                      />
                    )}
                    onChange={(event, newInputValue) =>
                      this.textFieldValidate(
                        this.state.formData.textFields.client.name,
                        newInputValue
                      )
                    }
                    // onInputChange={(event, value) =>
                    //   this.textFieldValidate(
                    //     this.state.formData.textFields.client.name,
                    //     value
                    //   )
                    // }
                  />
                  {!this.state.formData.textFields.client.isValid &&
                  this.state.formData.textFields.client.touched ? (
                    <div
                      style={{
                        color: "#f44336",
                        display: "block",
                        fontSize: "0.75rem",
                        marginLeft: 14,
                        marginRight: 14,
                      }}
                    >
                      Поле "{this.state.formData.textFields.client.label}" не заполнено!
                    </div>
                  ) : (
                    ""
                  )}
                </Box>
                <Box mb={2}>
                  <TextField
                    key={this.state.formData.textFields.destination.key}
                    name={this.state.formData.textFields.destination.name}
                    fullWidth={
                      this.state.formData.textFields.destination.fullWidth
                    }
                    autoFocus={
                      this.state.formData.textFields.destination.autoFocus
                    }
                    id={
                      this.state.formData.textFields.destination.id +
                      this.state.formData.textFields.destination.key.toString()
                    }
                    label={this.state.formData.textFields.destination.label}
                    type={this.state.formData.textFields.destination.type.toString()}
                    multiline={
                      this.state.formData.textFields.destination.multiline
                    }
                    defaultValue={
                      this.state.formData.textFields.destination.defaultValue
                    }
                    rowsMax={this.state.formData.textFields.destination.rowsMax}
                    variant={this.state.formData.textFields.destination.variant}
                    touched={this.state.formData.textFields.destination.touched.toString()}
                    error={
                      this.state.formData.textFields.destination.touched
                        ? !this.state.formData.textFields.destination.isValid
                        : this.state.formData.textFields.destination.touched
                    }
                    helperText={
                      this.state.formData.textFields.destination.helperText
                    }
                    onChange={(event) =>
                      this.textFieldValidate(
                        this.state.formData.textFields.destination.name,
                        event.target.value
                      )
                    }
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    key={this.state.formData.textFields.comment.key}
                    name={this.state.formData.textFields.comment.name}
                    fullWidth={this.state.formData.textFields.comment.fullWidth}
                    autoFocus={this.state.formData.textFields.comment.autoFocus}
                    id={
                      this.state.formData.textFields.comment.id +
                      this.state.formData.textFields.comment.key.toString()
                    }
                    label={this.state.formData.textFields.comment.label}
                    type={this.state.formData.textFields.comment.type.toString()}
                    multiline={this.state.formData.textFields.comment.multiline}
                    defaultValue={
                      this.state.formData.textFields.comment.defaultValue
                    }
                    rowsMax={this.state.formData.textFields.comment.rowsMax}
                    variant={this.state.formData.textFields.comment.variant}
                    touched={this.state.formData.textFields.comment.touched.toString()}
                    error={
                      this.state.formData.textFields.comment.touched
                        ? !this.state.formData.textFields.comment.isValid
                        : this.state.formData.textFields.comment.touched
                    }
                    helperText={
                      this.state.formData.textFields.comment.helperText
                    }
                    onChange={(event) =>
                      this.textFieldValidate(
                        this.state.formData.textFields.comment.name,
                        event.target.value
                      )
                    }
                  />
                </Box>
              </Grid>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                // className={classes.RPKOutcomePage__button}
              >
                <Box m={3}>
                  <Button
                    id="formButton"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={() => this.addButtonClicked()}
                  >
                    Добавить запись
                  </Button>
                  <div
                    className="lds-dual-ring"
                    style={{ display: "none" }}
                  ></div>
                </Box>
              </Grid>
            </form>
          </div>
        </div>
      </div>,
      this.modal
    );
  }
}
