import React from "react";
import classes from "./RPKRequest.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Grid, TextField, Box } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class RPKRequest extends React.Component {
  insertClasses = [classes.RPKRequest];
  constructor(props) {
    super(props);

    this.state = {
      operation: this.props.operation
    }
    // console.log(this.state);
    
    this.newStatus = '';
  }

  toggleStatusLine = (requestId) => {
    const element = document.querySelector('[id="'+requestId+'"][type="statusLine"]');
    if (element.getAttribute('display') === 'false') {
      element.setAttribute('display', 'true');
      element.style.display = 'block';
    } else {
      element.setAttribute('display', 'false');
      element.style.display = null;
    }
  }

  applyStatus = (operationId) => {
    const operation = this.props.operation;
    operation.status = this.newStatus;
    // console.log(operation);
    this.props.applyRequestStatus(operation);
  }

  changeStatusHandler = (operationId, value) => {
    this.newStatus = value;
    // console.log(this.newStatus);
  }

  updateLine = (operation) => {
    this.toggleStatusLine(operation._id);
    // console.log(document.querySelector('[status="'+operation._id+'"]'));
    document.querySelector('[status="'+operation._id+'"]').textContent = operation.status;
  }

  render() {
    // if(this.props.operation.bankId === 'manual') {
    //   console.log(this.props.operation);
    // }
    let status = this.state.operation.status;
    if (status === "" ) {
      status = 'Без статуса';
    }
    // console.log(this.props.uniqueStatus);

    return (
      <div
        onDoubleClick={this.props.onDoubleClick}
        className={this.insertClasses.join(" ")}
        operationid={this.state.operation._id}
        display="true"
      >
        <div className={classes.RPKRequest__table}>
          <table>
            <tbody>
              <tr style={{ backgroundColor: this.props.trColor }}>
                <td style={{
                  backgroundColor: this.state.operation.status === ''
                    ? '#FDBFBF'
                    : '' 
                }}>
                  <div status={this.state.operation._id}>                    
                    {status}
                  </div>          
                  <div>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      style={{ marginTop: 5 }}
                    >
                      <div
                        className={classes.filter}
                        onClick={() =>
                          this.toggleStatusLine(this.state.operation._id)
                        }
                      >
                        <FontAwesomeIcon icon={faPenSquare} size="2x" />
                      </div>
                    </Grid>

                    <div
                      id={this.state.operation._id}
                      type="statusLine"
                      className={classes.filterLine}
                      display="false"
                    >
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Autocomplete
                            freeSolo
                            name={this.state.operation._id}
                            options={
                              this.props.uniqueStatusList
                                .length > 0 &&
                              this.props.uniqueStatusList[0] !==
                                ""
                                ? this.props.uniqueStatusList
                                : []
                            }
                            // defaultValue={
                            //   this.state.operation.status !== ''
                            //     ? this.state.operation.status
                            //     : ''
                            // }
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Введите статус"
                                variant="filled"
                              />
                            )}
                            onInputChange={(event, value) =>
                              this.changeStatusHandler(
                                this.state.operation._id,
                                value
                              )
                            }
                          />
                        </Box>
                        <Box>                            
                          <FontAwesomeIcon
                            icon={faCheck}
                            size="2x"
                            color="#398def"
                            style={{ cursor: "pointer", padding: "10px", color: '#53a54c'}}
                            onClick={() =>
                              this.applyStatus(
                                this.state.operation._id
                              )
                            }
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            size="2x"
                            color="#398def"
                            style={{ cursor: "pointer", padding: "10px" }}
                            onClick={() =>
                              this.toggleStatusLine(
                                this.state.operation._id
                              )
                            }
                          /> 
                        </Box>
                      </Grid>
                    </div>
                  </div>
                  
                </td>
                <td>
                  {this.props.firstEl ? this.state.operation.request : ""}
                </td>
                {/* <td>
                  {this.props.operation.type === "income"
                    ? this.props.operation.client
                    : ""}
                </td> */}
                <td>{this.state.operation.organization}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      height:
                        this.state.operation.type === "income" ? "65%" : "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.operation.type === "income"
                      ? parseFloat(+this.state.operation.value).toFixed(2) +
                        " руб."
                      : ""}
                  </div>

                  {this.state.operation.type === "income" ? (
                    <div
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        height: "35%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFF5C2",
                      }}
                    >
                      {this.state.operation.date}
                    </div>
                  ) : null}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      height:
                        this.state.operation.type === "outcome"
                          ? "65%"
                          : "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.operation.type === "outcome"
                      ? parseFloat(+this.state.operation.value).toFixed(2) +
                        " руб."
                      : ""}
                  </div>

                  {this.state.operation.type === "outcome" ? (
                    <div
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        height: "35%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFF5C2",
                      }}
                    >
                      {this.state.operation.date}
                    </div>
                  ) : null}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      height:
                        this.state.operation.type === "invoice"
                          ? "65%"
                          : "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.operation.type === "invoice"
                      ? parseFloat(+this.state.operation.value).toFixed(2) +
                        " руб."
                      : ""}
                  </div>

                  {this.state.operation.type === "invoice" ? (
                    <div
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        height: "35%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFF5C2",
                      }}
                    >
                      {this.state.operation.date}
                    </div>
                  ) : null}
                </td>
                <td>
                  {this.state.operation.client}
                </td>
                <td>{this.state.operation.destination}</td>
                <td>{this.state.operation.comment}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
