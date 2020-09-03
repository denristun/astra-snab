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
      operation: this.props.operation,
      key: Math.random(),
      autocomplete: this.props.uniqueStatusList
    }
    
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

  applyStatus = () => {
    const state = this.state;
    state.operation.status = this.newStatus;

    const oldStatus = document.querySelector('[status="'+this.state.operation._id+'"]').textContent;
    
    this.props.applyRequestStatus(state.operation, oldStatus, this.newStatus);

    state.autocomplete.push(this.newStatus);
    state.autocomplete = state.autocomplete.filter(el => el !== oldStatus);

    // console.log(state.autocomplete);

    state.key = Math.random();
    this.setState({
      ...state
    });

  }

  changeStatusHandler = (operationId, value) => {
    this.newStatus = value;
    // console.log(this.newStatus);
  }

  render() {
    // if(this.props.operation.bankId === 'manual') {
    //   console.log(this.props.operation);
    // }
    let status = this.state.operation.status;
    if (status === "" ) {
      status = 'Без статуса';
    }
    // console.log(this.props.uniqueStatusList);

    return (
      <div
        key={this.state.key}
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
                            key = {this.state.key}
                            name={this.state.operation._id}
                            options={
                              this.state.autocomplete
                                .length > 0
                                ? this.state.autocomplete
                                : []
                            }
                            defaultValue={
                              this.state.operation.status !== ''
                                ? this.state.operation.status
                                : ''
                            }
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
