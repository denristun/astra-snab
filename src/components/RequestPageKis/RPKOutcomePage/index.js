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
        invalid: true,
        type: 'outcome',
        status: false,

        textFields: {

        }
      }
    }
  }

  componentDidMount() {
    document.body.appendChild(this.modal);
  }

  componentWillUnmount() {
    document.body.removeChild(this.modal);
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
                <Box mb={3}>
                  <TextField
                    fullWidth
                    name='value'
                    id='filled-number'
                    label='Расход'
                    type='number'
                    value='1111'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    id='filled-search'
                    label='Поставщик'
                    name='client'
                    type='search'
                    variant='filled'
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    id='filled-multiline-flexible'
                    label='Назначение платежа'
                    name='destination'
                    multiline
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
                </Box>
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
