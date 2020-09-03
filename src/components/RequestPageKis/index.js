import React from "react";

import classes from "./RequestPageKis.module.scss";
import RPKHeader from "./RPKHeader";
import RPKRequest from "./RPKRequest";
import RPKButton from "./RPKButton";
import RPKResultLine from "./RPKResultLine";
import Loader from "../Loader";
import RPKGroups from "./RPKGroups";

import RPKRequestChangeDialog from "./RPKRequestChangeDialog";
// import requests from "../../Redux/Reducers/requests";

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
    uniqueValues: [],
    requests: [],
    error: '',
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

    const urlGroups = "http://sumincrmserver.holod30.ru/api/groups";
    try {
      let responseGroups = await fetch(urlGroups, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let groups = await responseGroups.json();
      
      await this.getUniqueData();

      // const activeGroup = groups[0].group;
      const activeGroup = 'БРР';

      this.getData(activeGroup);

      localStorage.setItem("group", JSON.stringify(activeGroup));

      console.log('componentDidMount');
    } catch (e) {
      this.setState({ error: e, loader: false });
    }
  }

  async getUniqueData() {
    const urlRequests = "http://sumincrmserver.holod30.ru/api/unique";
    try {
      let responseRequests = await fetch(urlRequests, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await responseRequests.json();
      console.log('getUniqueData');
      this.setState({ uniqueValues: data });
    } catch (e) {
      this.setState({ error: e, loader: false });
    }
  }

  getUniqueDataValues() {
    return this.state.uniqueValues;
  }

  async getData(group) {
    if (group === 'ВСЕ') {
      const urlRequests =
        "http://sumincrmserver.holod30.ru/api/bank";
      try {
        let responseRequests = await fetch(urlRequests, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        let data = await responseRequests.json();
        data.group = group;
  
        localStorage.setItem("originState", JSON.stringify(data));
  
        // console.log('getData');
  
        this.setState({
          requests: data,
          loader: false,
        })
      } catch (e) {
        this.setState({ error: e, loader: false });
      }
    } else {
      const urlRequests =
        "http://sumincrmserver.holod30.ru/api/requests_by_group";
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
  
        localStorage.setItem("originState", JSON.stringify(data));
  
        // console.log('getData');
  
        this.setState({
          requests: data,
          loader: false,
        })
      } catch (e) {
        this.setState({ error: e, loader: false });
      }
    }
  }

  clearFilters = () => {
    //Обнуление фильтров RPKHeader
    this._rpkHeader.updateState();
    this._rpkHeader.closeFilterLines();
  };

  selectGroup = (group) => {
    document
      .querySelectorAll('[type="clearFilterButton"]')
      .forEach((element) => {
        element.style.display = "none";
      });
    localStorage.setItem("group", JSON.stringify(group));
    this.filtersList = {};
    this.clearFilters();

    this.setState({ loader: true });
    this.getData(group);
  };

  getUniqueFilters = (requests) => {
    let clients = [];
    let status = [];
    let organizations = [];
    // let providers = [];
    let requestNums = [];

    Object.keys(requests).forEach((request) => {
      typeof requests[request] === "object" &&
        requests[request][1].map((operation) => {
          clients.push(operation.client);          
          organizations.push(operation.organization);
          status.push(operation.status);
          requestNums.push(operation.request);

          return operation;
        });
    });

    const uniqueStatus = new Set(status);
    const uniqueClients = new Set(clients);
    const uniqueOrganizations = new Set(organizations);
    // const uniqueProviders = new Set(providers);
    const uniqueRequests = new Set(requestNums);

    return {
      uniqueStatusList: [...uniqueStatus],
      uniqueClientList: [...uniqueClients],
      // uniqueProviderList: [...uniqueProviders],
      uniqueOrganizationList: [...uniqueOrganizations],
      uniqueRequestList: [...uniqueRequests],
    };
  };

  addOutcomeOperation = (formData) => {
    this.sendOutcomeOperationToServer(formData, this.state.requests);
  };

  deleteOperation = async (operation) => {
    await this.deleteOperationFromServer(operation, this.state.requests);
  };

  changeOperation = async (operation) => {
    await this.changeOperationFromServer(operation, this.state.requests);
  };

  async deleteOperationFromServer(operation, requests) {
    try {
      const url = "http://sumincrmserver.holod30.ru/api/request";
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: operation }),
      });

      const data = await response.json();
      Object.keys(requests).forEach((key) => {
        if (
          typeof requests[key][0] !== "undefined" &&
          requests[key][0] === operation.request
        ) {
          requests[key][1] = requests[key][1].filter(
            (operationElement) => operationElement !== operation
          );
        }
      });
      localStorage.setItem("originState", JSON.stringify(requests)); 
           
      this.setState({ requests, loader: false });
    } catch (e) {
      this.setState({ error: e, loader: false });
    }
  }

  async changeOperationFromServer(operation, requests) {
    try {
      const url = "https://astra-snab-server.herokuapp.com/api/request";
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      });

      const data = await response.json();
      // console.log(data);

      const tmpRequests = JSON.parse(localStorage.getItem('originState'));

      if (response.ok) {
        Object.keys(tmpRequests).forEach((key) => {
          if (
            typeof tmpRequests[key][0] !== "undefined" &&
            tmpRequests[key][0] === data.request
          ) {
            tmpRequests[key][1].push(data);
          }
        });
      }
      
      localStorage.setItem("originState", JSON.stringify(tmpRequests));
      this.apdateNativeBlock(operation);

    } catch (e) {
      this.setState({ error: e, loader: false });
    }
  }

  apdateNativeBlock = (operation) => {
    // console.log(operation);
    document.querySelector('[id="'+operation._id+'"][name="request"]').textContent = operation.request;
    document.querySelector('[id="'+operation._id+'"][name="outcome"]').textContent = parseFloat(+this.operation.value).toFixed(2)+" руб.";
    document.querySelector('[id="'+operation._id+'"][name="client"]').textContent = operation.client;
    document.querySelector('[id="'+operation._id+'"][name="organization"]').textContent = operation.organization;
    document.querySelector('[id="'+operation._id+'"][name="comment"]').textContent = operation.comment;
  }

  async sendOutcomeOperationToServer(formData) {
    try {
      const url = "http://sumincrmserver.holod30.ru/api/request";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // console.log(response);
      const tmpRequests = JSON.parse(localStorage.getItem('originState'));

      if (response.ok) {
        Object.keys(tmpRequests).forEach((key) => {
          if (
            typeof tmpRequests[key][0] !== "undefined" &&
            tmpRequests[key][0] === data.request
          ) {
            tmpRequests[key][1].push(data);
          }
        });
      }
      
      localStorage.setItem("originState", JSON.stringify(tmpRequests));
      this.addNativeBlock(formData);
      
    } catch (e) {
      this.setState({ error: e, loader: false });
    }
  }

  addNativeBlock = (formData) => {
    const additionalBlock = document.querySelector('[id="'+formData.request+'"][type="additional"]');
    // console.log(additionalBlock);
    const additionalDiv = (
      <div>
        <div></div>
      </div>
    );
  }

  changeFilter = (filterName, value) => {
    this.filtersList[filterName] = value;
    // console.log(this.filtersList);

    let filterOriginState = JSON.parse(localStorage.getItem("originState"));
    // console.log(filterOriginState);

    Object.keys(this.filtersList).forEach((key) => {
      if (
        this.filtersList[key] !== null &&
        this.filtersList[key].trim().length > 0
      ) {
        filterOriginState = filterOriginState.filter((element) => {
          element[1] = element[1].filter((operation) => {
            
            if (key === "income" || key === "outcome" || key === "invoice") {
              if (
                key === "income" &&
                operation.type === "income" &&
                operation.value
                  .toString()
                  .toLowerCase()
                  .indexOf(this.filtersList[key].toLowerCase()) !== -1
              ) {
                return operation;
              }
              if (
                key === "outcome" &&
                operation.type === "outcome" &&
                operation.value
                  .toString()
                  .toLowerCase()
                  .indexOf(this.filtersList[key].toLowerCase()) !== -1
              ) {
                return operation;
              }
              if (
                key === "invoice" &&
                operation.type === "invoice" &&
                operation.value
                  .toString()
                  .toLowerCase()
                  .indexOf(this.filtersList[key].toLowerCase()) !== -1
              ) {
                return operation;
              }
              return;
            }

            if (
              operation[key]
                .toLowerCase()
                .indexOf(this.filtersList[key].toLowerCase()) !== -1
            ) {
              return operation;
            }
          });

          if (typeof element[1] !== "undefined" && element[1].length > 0) {
            return element;
          }
        });
      }
    });

    this.setState({requests:filterOriginState});
  };

  applyRequestStatus = (operation, oldStatus, newStatus) => {  
    this._rpkHeader.updateStatusList(oldStatus, newStatus);
    this.changeOperationStatusBase(operation, this.state.requests);
  };

  async changeOperationStatusBase(operation, requests) {
    // console.log(requestId + ' ======== '+status)
    try {
      const url = "http://sumincrmserver.holod30.ru/api/request";
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      });

      const data = await response.json();

      // console.log(response);
      // console.log(data);

      const tmpRequests = JSON.parse(localStorage.getItem('originState'));

      if (response.ok) {
        Object.keys(tmpRequests).forEach((key) => {
          if (
            typeof tmpRequests[key][0] !== "undefined" &&
            tmpRequests[key][0] === data.request.request
          ) {
            tmpRequests[key][1] = tmpRequests[key][1].map((operation) => {
              if (operation._id === data.request._id) {
                operation.status = data.request.status;
              }
              return operation;
            });
          }
        });
      }
      
      localStorage.setItem("originState", JSON.stringify(tmpRequests));
      // console.log('Change origin state');

      // this.setState({requests});

    } catch (e) {
      this.setState({ error: e, loader: false });
    }
  }

  render() {
    let incomeAll = 0;
    let outcomeAll = 0;
    let invoiceAll = 0;

    const uniqueFilters = this.getUniqueFilters(this.state.requests);
    const uniqueValues = this.getUniqueDataValues();
    // console.log(uniqueFilters);

    return (
      <div className={insertClasses.join(" ")}>
        <RPKHeader
          sortOperatoions={this.sortOperatoions}
          changeFilter={this.changeFilter}
          uniqueFilters={uniqueFilters}
          ref={(func) => {
            this._rpkHeader = func;
          }}
        />
        <RPKRequestChangeDialog
          changeOperation={this.changeOperation}
          deleteOperation={this.deleteOperation}
          ref={(requestChangeDialog) => {
            this._requestChangeDialog = requestChangeDialog;
          }}
        ></RPKRequestChangeDialog>

        {this.state.loader ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div>
            {this.state.error === '' && this.state.requests.length > 0 ? (
              <div className={classes.content} id="RPKContent">
                {this.state.requests.map((request, index) => {
                  let opertionID = request[0];
                  let operations = [];
                  let income = 0;
                  let outcome = 0;
                  let invoice = 0;

                  for (let i = 0; i < request[1].length; i++) {
                    if (request[1][i].type === "income" && +request[1][i].value > 0) {
                      income = income + request[1][i].value;
                    }
                    if (request[1][i].type === "outcome" && +request[1][i].value > 0) {
                      outcome = outcome + request[1][i].value;
                    }
                    if (request[1][i].type === "invoice" && +request[1][i].value > 0) {
                      invoice = invoice + request[1][i].value;
                    }

                    operations.push(
                      <div
                        key={request[1][i]._id}
                      >
                        <RPKRequest
                          onDoubleClick={() =>
                            this._requestChangeDialog.handleShow(
                              request[1][i],
                              uniqueValues
                            )
                          }
                          firstEl={i === 0 ? true : false}
                          operation={request[1][i]}
                          operationId={opertionID}
                          uniqueStatusList={uniqueFilters.uniqueStatusList}
                          trColor={i % 2 ? "#EBEBEB" : "#FFFFFF"}
                          applyRequestStatus={this.applyRequestStatus}
                          
                        />
                      </div>                      
                    );
                  }

                  operations.push(
                    <div                    
                      type="additional" 
                      id={request[0]}
                      key={index.toString() + Math.random()}
                    >
                    </div>
                  )

                  operations.push(
                    <RPKButton
                      key={index.toString() + Math.random()}
                      request={request[0]}
                      uniqueValues={uniqueValues}
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
                        invoice,
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
              <div
                style={{
                  display: "flex",
                  marginTop: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3>Нет данных {this.state.error}</h3>
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
              invoice: invoiceAll,
            }}
            operationId="totalResult"
            trColor={"#398DEF"}
          />

            {/* {console.log(this.state.requests.group) || console.log(JSON.parse(localStorage.getItem("group")))} */}

          <RPKGroups
            activeGroup={ 
              this.state.requests.group ||
              JSON.parse(localStorage.getItem("group"))
              
            }
            selectGroup={this.selectGroup}
          />
        </div>

        <div id="OutcomePage"></div>
      </div>
    );
  }
}

export default RequestPageKis;
