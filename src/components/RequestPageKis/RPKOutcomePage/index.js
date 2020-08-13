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
            name: 'value',
            fullWidth: true,
            autoFocus: false,
            id: 'filled-number',
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
          },
          {
            name: 'client',
            fullWidth: true,
            autoFocus: false,
            id: 'filled-search',
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
          },
          {
            name: 'destination',
            fullWidth: true,
            autoFocus: false,
            id: 'filled-multiline-flexible',
            label: 'Назначение платежа',
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
          },
          {
            name: 'comment',
            fullWidth: true,
            autoFocus: false,
            id: 'filled-multiline-flexible',
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
          },
        ],
      },
    };
  }

  componentDidMount() {
    document.body.appendChild(this.modal);
  }

  componentWillUnmount() {
    document.body.removeChild(this.modal);
  }

  onChangeHandler = (name, event) => {
    // const formData = {...this.state.formData};
    // const control = {...formData.textFields.find(textField => textField.name === name)};
    
    // control.touched = true;
    // control.defaultValue = event.target.value;
    // control.isValid = this.validateControl(control.defaultValue, control.validation);
    // // control.autoFocus = true;

    // for(let i=0;i<formData.textFields.length;i++){
    //   if(formData.textFields[i].name === name){
    //     formData.textFields[i] = control;
    //   }
    // }

    // this.setState({
    //   formData
    // })


    const formData = this.state.formData;
    const control = formData.textFields.find(textField => textField.name === name);
    
    control.touched = true;
    control.defaultValue = event.target.value;
    control.isValid = this.validateControl(control.defaultValue, control.validation);
    control.autoFocus = true;

    formData.textFields.map(textField => {
      if (textField.name === name) {
        return (control);
      } else {
        textField.autoFocus = false;
        return textField;
      }
    })

    this.setState({
      formData
    })

  };

  validateControl = (value, validations) => {
    let isValid = true;
    Object.keys(validations).forEach(validation => {

    })

    return isValid;
  }

  render() {
    // console.log(this.props.clientList);
    return ReactDOM.createPortal(
      <div className={insertClasses.join(' ')}>
        <div className='backdrop'>
          <div className='modal'>
            <form>
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
                  return (
                    <Box key={index + Math.random()} mb={2}>
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
                        validation={textField.validation}
                        variant={textField.variant}
                        onChange={event => this.onChangeHandler(textField.name, event)}
                      />
                    </Box>
                  );
                })}

                {/* <Box mb={3}>
                  <TextField
                    fullWidth
                    name='value'
                    id='filled-number'
                    label='Расход'
                    type='number'
                    defaultValue=''
                    variant='filled'
                    rowsMax={4}
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    id='filled-search'
                    label='Поставщик'
                    name='client'
                    // type='search'
                    variant='filled'
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    id='filled-multiline-flexible'
                    label='Назначение платежа'
                    name='destination'
                    type={false}
                    multiline={true}
                    rowsMax={4}
                    // value={value}
                    // onChange={handleChange}
                    variant='filled'
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    id='filled-multiline-flexible'
                    label='Комментарий'
                    name='comment'
                    multiline
                    rowsMax={4}
                    // value={value}
                    // onChange={handleChange}
                    variant='filled'
                  />
                </Box> */}
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
                    variant='contained'
                    color='primary'
                    size='large'
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Добавить запись
                  </Button>
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
