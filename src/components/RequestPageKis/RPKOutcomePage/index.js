import React from 'react';
import ReactDOM from 'react-dom';
import classes from './RPKOutcomePage.module.scss';
import 'font-awesome/css/font-awesome.min.css';

// import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

let insertClasses = [classes.RPKOutcomePage];

export default class RPKOutcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.modal = document.createElement('div');
    this.state = {
      formData: {
        isValid: false,
        type: 'outcome',
        status: false,
        textFields: [
          {
            autoFocus: false,
            name: 'value',
            fullWidth: true,
            id: 'outcomeFormInput',
            label: 'Расход',
            type: 'number',
            multiline: false,
            rowsMax: 1,
            defaultValue: '',
            variant: 'filled',
            touched: false,
            isValid: false,
            validation: {
              required: true,
              minLength: 1,
            },
            helperText: '',
          },
          {
            name: 'client',
            fullWidth: true,
            id: 'outcomeFormInput',
            label: 'Поставщик',
            type: 'search',
            multiline: false,
            rowsMax: 1,
            defaultValue: '',
            variant: 'filled',
            touched: false,
            isValid: false,
            validation: {
              required: true,
              minLength: 3,
            },
            helperText: '',
            autoFocus: false,
          },
          {
            name: 'destination',
            fullWidth: true,
            id: 'outcomeFormInput',
            label: 'Назначение платежа',
            type: false,
            multiline: true,
            rowsMax: 4,
            defaultValue: '',
            variant: 'filled',
            touched: false,
            isValid: true,
            validation: {
              required: true,
              minLength: 3,
            },
            helperText: '',
            autoFocus: false,
          },
          {
            name: 'comment',
            fullWidth: true,
            id: 'outcomeFormInput',
            label: 'Комментарий',
            type: false,
            multiline: true,
            rowsMax: 4,
            defaultValue: '',
            variant: 'filled',
            touched: false,
            isValid: false,
            validation: {
              required: true,
              minLength: 3,
            },
            helperText: '',
            autoFocus: false,
          },
        ],
      },
    };
  }

  componentDidMount() {
    document.body.appendChild(this.modal);
    this.setListeners();
  }

  componentWillUnmount() {
    document.body.removeChild(this.modal);
  }

  setListeners = () => {
    document.querySelectorAll('#outcomeFormInput').forEach((el) => {
      el.addEventListener('blur', (event) =>
        this.blurTextField(
          event.target.getAttribute('name'),
          event.target.value
        )
      );
    });

    this.modal.addEventListener('mouseup', (event) => {
      if (event.target.getAttribute('id') === 'outcomeFormInput') {
        event.target.focus();
      }
    });
  };

  blurTextField = (textFieldName, textFieldValue) => {
    const formData = this.state.formData;
    const textField = formData.textFields.find(
      (textField) => textField.name === textFieldName
    );

    textField.touched = true;
    textField.defaultValue = textFieldValue;
    const validations = this.textFieldValidation(
      textFieldValue,
      textField.validation
    );
    textField.isValid = validations.isValid;
    textField.isValid === false
      ? (textField.helperText = validations.validationFailedMessage)
      : (textField.helperText = '');

    formData.textFields.map((textFieldEl) => {
      if (textFieldEl.name === textField.name) {
        return textField;
      } else {
        return textFieldEl;
      }
    });

    this.setState({
      formData,
    });
    this.setListeners();
  };

  textFieldValidation = (value, validations) => {
    let isValid = true;
    let validationFailedMessage = '';
    Object.keys(validations).forEach((validation) => {
      if (validation === 'required') {
        isValid = value.trim().length >= 0 && isValid;
        isValid === false
          ? (validationFailedMessage = 'Поле не заполнено')
          : (validationFailedMessage = '');
      }
      if (validation === 'minLength') {
        isValid = value.trim().length >= validations[validation] && isValid;
        isValid === false
          ? (validationFailedMessage =
              'Недостаточно символов. Минимум: ' + validations[validation])
          : (validationFailedMessage = '');
      }
    });

    return { isValid, validationFailedMessage };
  };

  validateForm = () => {
    const formData = this.state.formData;
    let isFormValid = true;
    formData.textFields = formData.textFields.map((textField) => {
      const textFieldValue = document.querySelector(
        '[name=' + textField.name + ']'
      ).value;
      textField.touched = true;
      textField.defaultValue = textFieldValue;
      const validations = this.textFieldValidation(
        textFieldValue,
        textField.validation
      );
      textField.isValid = validations.isValid;
      textField.isValid === false
        ? (textField.helperText = validations.validationFailedMessage)
        : (textField.helperText = '');

      isFormValid = isFormValid && textField.isValid;

      return textField;
    });

    formData.isValid = isFormValid;

    return formData;
  };

  getFormatDate = (date) => {
    let day = date.getDate().toString();
    let month = date.getMonth().toString();
    let year = date.getFullYear().toString();

    if (day.length<2) { day='0'+day; }
    if (month.length<2) { month='0'+month; }

    return (day+'.'+month+'.'+year);
  }

  addButtonClicked = () => {
    this.buttonLoaderActivator('show');
    const formData = this.validateForm();
    if (formData.isValid) {
      const stateTextFields = this.state.formData.textFields;
      let formTextFields = {};
      stateTextFields.forEach((textField) => {
        formTextFields[textField.name] = document.querySelector(
          '[name=' + textField.name + ']'
        ).value;
      });
      formTextFields.value = (+formTextFields.value).toFixed(2);
      formTextFields.request = this.props.request;
      formTextFields.date = this.getFormatDate(new Date());
      formTextFields.status = false;
      formTextFields.type = 'outcome';

      // console.log(formTextFields);

      this.props.addOutcomeOperation(formTextFields);
     
    } else {
      this.setState({
        formData,
      });
    } 

    this.buttonLoaderActivator('hide');
  };

  buttonLoaderActivator = (prop) => {
    switch (prop) {
      case 'show':
        document.querySelector('#formButton').style.display = 'none';
        document.querySelector('.lds-dual-ring').style.display = 'block';
        break;
      case 'hide':
        document.querySelector('#formButton').style.display = null;
        document.querySelector('.lds-dual-ring').style.display = 'none';
        break;
    }
  };

  render() {
    // console.log(this.state.formData);
    return ReactDOM.createPortal(
      <div className={insertClasses.join(' ')} key='sanddwich'>
        <div className='backdrop'>
          <div className='modal'>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
              className={classes.RPKOutcomePage__title}
            >
              <Box ml={1}>
                <h3>
                  Добавить расход к заявке: <span>{this.props.request}</span>
                </h3>
              </Box>
              <Box mr={0.5}>
                <i
                  className='fa fa-times fa-2x'
                  onClick={() => this.props.closeModal()}
                ></i>
              </Box>
            </Grid>
            <Grid className={classes.RPKOutcomePage__content}>
              {this.state.formData.textFields.map((textField, index) => {
                const keyValue = index + Math.random();
                return (
                  <Box key={keyValue} mb={2}>
                    <TextField
                      name={textField.name}
                      fullWidth={textField.fullWidth}
                      autoFocus={textField.autoFocus}
                      id={textField.id}
                      label={textField.label}
                      type={textField.type.toString()}
                      multiline={textField.multiline}
                      rowsMax={textField.rowsMax}
                      defaultValue={textField.defaultValue}
                      variant={textField.variant}
                      touched={textField.touched.toString()}
                      error={
                        textField.touched
                          ? !textField.isValid
                          : textField.touched
                      }
                      helperText={textField.helperText}
                    />
                  </Box>
                );
              })}
            </Grid>
            <Grid
              container
              direction='row'
              justify='flex-end'
              alignItems='center'
              className={classes.RPKOutcomePage__button}
            >
              <Box m={3}>
                <Button
                  id='formButton'
                  variant='contained'
                  color='primary'
                  size='large'
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={() => this.addButtonClicked()}
                >
                  Добавить запись
                </Button>
                <div
                  className='lds-dual-ring'
                  style={{ display: 'none' }}
                ></div>
              </Box>
            </Grid>
          </div>
        </div>
      </div>,
      this.modal
    );
  }
}
