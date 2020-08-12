import React from 'react';

import classes from './RequestPageKis.module.scss';
import RPKHeader from './RPKHeader';
import RPKRequest from './RPKRequest';
import { connect } from 'react-redux';
import RPKButton from './RPKButton';
import RPKResultLine from './RPKResultLine';
import Loader from '../Loader';
import RPKGroups from './RPKGroups';

let insertClasses = [classes.RequestPageKis];
function headerShift(elem, param) {
  if (elem) {
    elem.style.paddingTop = param;
  }
}

class RequestPageKis extends React.Component {
  state = {
    loader: true,
  };

  async componentDidMount() {
    const RPKContant = document.querySelector('[id="RPKContent"]');
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 10) {
        headerShift(RPKContant, '16px');
      } else {
        headerShift(RPKContant, null);
      }
    });

    const urlGroups = 'http://10.36.2.56:8000/api/groups';
    try {
      let responseGroups = await fetch(urlGroups, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let groups = await responseGroups.json();

      this.getData(groups[0].group);
      // console.log(groups);
    } catch (e) {
      console.log(e);
    }
  }

  async getData(group) {
    const urlRequests = 'http://10.36.2.56:8000/api/requests_by_group';
    try {
      let responseRequests = await fetch(urlRequests, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group }),
      });
      let data = await responseRequests.json();
      data.group = group;
      console.log(data);
      this.props.renderData(data);

      this.setState({
        loader: false,
      });
    } catch (e) {
      this.props.renderData({ error: e });

      this.setState({
        loader: false,
      });
    }
  }

  selectGroup = (group) => {
    // console.log('selectGroup: ', group);
    this.setState({ loader: true });
    this.getData(group);
  };

  getClientsFromRequests = (requests) => {
    let clients = [];
    Object.keys(requests).forEach(request => {
      typeof(requests[request]) === 'object' && requests[request][1].map(operation => {
        clients.push(operation.client);
      })
    });
    const uniqueClients = new Set(clients);

    return [...uniqueClients];
  }

  render() {
    let incomeAll = 0;
    let outcomeAll = 0;
    const clientsList = this.getClientsFromRequests(this.props.requests);    

    return (
      <div className={insertClasses.join(' ')}>
        <RPKHeader />

        {this.state.loader ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div>
            {!this.props.requests.error ? (
              <div className={classes.content} id='RPKContent'>
                {this.props.requests.map((request, index) => {
                  let operations = [];
                  let income = 0;
                  let outcome = 0;

                  for (let i = 0; i < request[1].length; i++) {
                    request[1][i].type === 'income' && +request[1][i].value > 0
                      ? (income = income + request[1][i].value)
                      : (outcome = outcome + request[1][i].value);
                    operations.push(
                      <RPKRequest
                        key={index.toString() + Math.random()}
                        firstEl={i === 0 ? true : false}
                        operation={request[1][i]}
                        trColor={i % 2 ? '#EBEBEB' : '#FFFFFF'}
                      />
                    );
                  }

                  operations.push(
                    <RPKButton
                      key={index.toString() + Math.random()}
                      request={request[0]}
                      clientList={clientsList}
                    />
                  );

                  operations.push(
                    <RPKResultLine
                      key={index.toString() + Math.random()}
                      operation={{
                        title: 'Итог',
                        income,
                        outcome,
                      }}
                      trColor={'#53A54C'}
                    />
                  );
                  incomeAll += income;
                  outcomeAll += outcome;

                  return operations;
                })}
              </div>
            ) : (
              <div>
                <h1>Error {this.props.requests.error}</h1>
                <button onClick={() => console.log(this.props.requests)}>
                  Кнопка
                </button>
              </div>
            )}
          </div>
        )}

        <div className={classes.RequestPageKis__footer}>
          <RPKResultLine
            key={Math.random()}
            operation={{
              title: 'СУММЫ',
              income: incomeAll,
              outcome: outcomeAll,
            }}
            trColor={'#398DEF'}
          />
          <RPKGroups
            activeGroup={this.props.requests.group}
            selectGroup={this.selectGroup}
          />
        </div>

        <div id='OutcomePage'></div>
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
