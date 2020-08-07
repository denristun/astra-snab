import React from 'react';
import classes from './RequestPageKis.module.scss';
import RPKHeader from './RPKHeader';
import RPKRequest from './RPKRequest';
import { connect } from 'react-redux';

let insertClasses = [classes.RequestPageKis];
function headerShift(elem, param) {
  if (elem) {
    elem.style.paddingTop = param;
  }
}

class RequestPageKis extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const RPKContant = document.querySelector('[id="RPKContent"]');
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 10) {
        headerShift(RPKContant, '16px');
      } else {
        headerShift(RPKContant, null);
      }
    });

    // this.getData();
  }

  async getData() {
    const url = 'http://10.36.2.56:8000/api/bank';
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      console.log(data);
      this.props.renderData(data);
    } catch (e) {
      this.props.renderData({ error: e });
    }
  }

  render() {
    return (
      <div className={insertClasses.join(' ')}>
        <RPKHeader />

        {!this.props.requests.error ? (
          <div className={classes.content} id='RPKContent'>
            {this.props.requests.map((request, index) => {
              let operations = [];
              let income = 0;
              let outcome = 0;

              for (let i = 0; i < request[1].length; i++) {
                request[1][i].type === 'income' && +request[1][i].value>0 ? (income = income + request[1][i].value) : (outcome = outcome + request[1][i].value);
                operations.push(
                  <RPKRequest
                    key={index.toString() + Math.random()}
                    firstEl={i === 0 ? true : false}
                    operation={request[1][i]}
                    trColor={i%2 ? '#EBEBEB' : '#FFFFFF'}
                  />
                )                  
              }



              return operations;
            })}
          </div>
        ) : (
          <div>
            <h1>Error {this.props.requests.error}</h1>
            <button onClick={() => console.log(this.props.requests)}>
              sdsds
            </button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.requests,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    renderData: (data) => dispatch({ type: 'RENDER_DATA', data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPageKis);
