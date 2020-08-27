import React from "react";

import classes from "./RequestPageKis.module.scss";
import RPKHeader from "./RPKHeader";
import RPKRequest from "./RPKRequest";
import { connect } from "react-redux";
import RPKButton from "./RPKButton";
import RPKResultLine from "./RPKResultLine";
import Loader from "../Loader";
import RPKGroups from "./RPKGroups";

import RPKRequestChangeDialog from './RPKRequestChangeDialog'

let insertClasses = [classes.RequestPageKis];

function headerShift(elem, param) {
  if (elem) {
    elem.style.paddingTop = param;
  }
}

class RequestPageKis extends React.Component {
  state = {
    loader: true,
    update: true,
  };

  // originState = {};
  filtersList = {};

  async componentDidMount() {
    const RPKContant = document.querySelector('[id="RPKContent"]');
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 10) {
        headerShift(RPKContant, "16px");
      } else {
        headerShift(RPKContant, null);
      }
    });

    const urlGroups = "https://astra-snab-server.herokuapp.com/api/groups";
    try {
      let responseGroups = await fetch(urlGroups, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let groups = await responseGroups.json();

      this.getData(groups[0].group);
      // console.log(this.originState);
    } catch (e) {
      console.log(e);
      this.setState({
        loader: false,
      });
    }
  }

  async getData(group) {
    const urlRequests =
      "https://astra-snab-server.herokuapp.com/api/requests_by_group";
    try {
      let responseRequests = await fetch(urlRequests, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group }),
      });
      let data = await responseRequests.json();
      data.group = group;
      // console.log(data);
      this.props.renderData(data);

      localStorage.setItem('originState', JSON.stringify(data));
      // console.log(this.originState);

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

  getUniqueFilters = (requests) => {
    let clients = [];
    let status = [];
    let organizations = [];
    let providers = [];

    Object.keys(requests).forEach((request) => {
      typeof requests[request] === "object" &&
        requests[request][1].map((operation) => {
          if (operation.type === "income") {
            clients.push(operation.client);
          } else {
            providers.push(operation.client);
          }
          organizations.push(operation.organization);
          status.push(operation.status);
        });
    });

    const uniqueStatus = new Set(status);
    const uniqueClients = new Set(clients);
    const uniqueOrganizations = new Set(organizations);
    const uniqueProviders = new Set(providers);

    return {
      uniqueStatusList: [...uniqueStatus],
      uniqueClientList: [...uniqueClients],
      uniqueProviderList: [...uniqueProviders],
      uniqueOrganizationList: [...uniqueOrganizations],
    };
  };

  addOutcomeOperation = (formData) => {
    this.sendOutcomeOperationToServer(formData, this.props.requests);
  };

  deleteOperation = (operationId) => {
    this.deleteOperationFromServer(operationId, this.props.requests);
  }


  async deleteOperationFromServer (operationId) {

    try{
      const url = "https://astra-snab-server.herokuapp.com/api/request";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); 
    }
    catch (e) {
      console.log(e);
    }

  }

  async sendOutcomeOperationToServer(formData, requests) {
    try {
      const url = "https://astra-snab-server.herokuapp.com/api/request";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      Object.keys(requests).forEach((key) => {
        if (
          typeof requests[key][0] !== "undefined" &&
          requests[key][0] === data.request
        ) {
          requests[key][1].push(data);
        }
      });

      this.props.renderData(requests);
      this.setState({
        loader: false,
        update: !this.state.update,
      });
    } catch (e) {
      console.log(e);
    }
  }

  sortOperatoions = (sortType) => {
    if (sortType === "value") {
    }
  };

  



  changeFilter = (filterName, value) => {
    this.filtersList[filterName] = value;
    console.log(this.filtersList);

    let filterOriginState = JSON.parse(localStorage.getItem('originState'));
    // console.log(filterOriginState);

    Object.keys(this.filtersList).forEach(key => {
      if (this.filtersList[key] !== null && this.filtersList[key].trim().length > 0) {
        // console.log(key);
        filterOriginState = filterOriginState.filter((element) => {
          if (typeof(element[1]) !== 'undefined'){
            element[1] = element[1].filter(operation => {
              console.log(key);
              switch(key) {
                case 'client':
                  // console.log('client');
                  if(operation.type === 'income' && operation.client.toLowerCase().indexOf(this.filtersList[key].toLowerCase())) {
                    return operation;
                  }
                  break;
                case 'provider':
                  if(operation.type === 'outcome' && operation.client.toLowerCase().indexOf(this.filtersList[key].toLowerCase())) {
                    return operation;
                  }
                  break;
                case 'income':
                  if(operation.type === 'income' && operation.value.toLowerCase().indexOf(this.filtersList[key].toLowerCase())) {
                    return operation;
                  }
                  break;
                case 'outcome':
                  if(operation.type === 'outcome' && operation.value.toLowerCase().indexOf(this.filtersList[key].toLowerCase())) {
                    return operation;
                  }
                  break;
                default:
                  if(operation[key].toLowerCase().indexOf(this.filtersList[key].toLowerCase())) {
                    return operation;
                  }
                  break;
              }
              

            });

            if (element[1].length>0) {
              return element;
            }
          }
        });
      }
    });

    console.log(filterOriginState); 

    this.props.renderData(filterOriginState);
  };


 

  render() {
    // console.log(this.originState);
    let incomeAll = 0;
    let outcomeAll = 0;

    const uniqueFilters = this.getUniqueFilters(this.props.requests);
    // console.log(uniqueFilters);

    return (
      <div className={insertClasses.join(" ")}>
        <RPKHeader
          sortOperatoions={this.sortOperatoions}
          changeFilter={this.changeFilter}
          uniqueFilters={uniqueFilters}
        />
         <RPKRequestChangeDialog ref={(requestChangeDialog) => { this._requestChangeDialog = requestChangeDialog }}></RPKRequestChangeDialog>

        {this.state.loader ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div>
            {!this.props.requests.error ? (
              <div className={classes.content} id="RPKContent">
                {this.props.requests.map((request, index) => {
                  let opertionID = request[0];
                  let operations = [];
                  let income = 0;
                  let outcome = 0;

                  for (let i = 0; i < request[1].length; i++) {
                    request[1][i].type === "income" && +request[1][i].value > 0
                      ? (income = income + request[1][i].value)
                      : (outcome = outcome + request[1][i].value);
                    operations.push(
                      <RPKRequest
                      onClick={() => this._requestChangeDialog.handleShow(request[1][i])}
                        key={index.toString() + Math.random()}
                        firstEl={i === 0 ? true : false}
                        operation={request[1][i]}
                        operationId={opertionID}
                        trColor={i % 2 ? "#EBEBEB" : "#FFFFFF"}
                      />
                    );
                  }

                  operations.push(
                    <RPKButton
                      key={index.toString() + Math.random()}
                      request={request[0]}
                      uniqueFilters={uniqueFilters}
                      operationId={opertionID}
                      addOutcomeOperation={this.addOutcomeOperation}
                    />
                  );

                  operations.push(
                    <RPKResultLine
                      key={index.toString() + Math.random()}
                      operation={{
                        title: "Итог",
                        income,
                        outcome,
                      }}
                      operationId={opertionID}
                      trColor={"#53A54C"}
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
              </div>
            )}
          </div>
        )}

        <div className={classes.RequestPageKis__footer}>
          <RPKResultLine
            key={Math.random()}
            operation={{
              title: "СУММЫ",
              income: incomeAll,
              outcome: outcomeAll,
            }}
            operationId="totalResult"
            trColor={"#398DEF"}
          />
          <RPKGroups
            activeGroup={this.props.requests.group}
            selectGroup={this.selectGroup}
          />
        </div>

        <div id="OutcomePage"></div>
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
    renderData: (data) => dispatch({ type: "RENDER_DATA", data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPageKis);
