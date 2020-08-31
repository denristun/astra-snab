import React from "react";
import classes from "./RPKRequest.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Grid, TextField, Box } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class RPKRequest extends React.Component {
  insertClasses = [classes.RPKRequest];

  componentDidMount() {
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

  applyStatus = (requestId) => {
    this.props.applyRequestStatus(requestId, this.newStatus);
  }

  changeStatusHandler = (requestId, value) => {
    this.newStatus = value;
    // console.log(this.newStatus);
  }

  render() {
    // console.log(this.props.operation.status);
    let status = this.props.operation.status;
    if (status === "") {
      status = "Статус не назначен";
    }
    // console.log(this.props.uniqueStatus);

    return (
      <div
        onDoubleClick={this.props.onDoubleClick}
        className={this.insertClasses.join(" ")}
        operationid={this.props.operationId}
        display="true"
      >
        <div className={classes.RPKRequest__table}>
          <table>
            <tbody>
              <tr style={{ backgroundColor: this.props.trColor }}>
                <td>
                  {this.props.firstEl ? status : ""}

                  {this.props.firstEl ? (
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
                            this.toggleStatusLine(this.props.operation.request)
                          }
                        >
                          <FontAwesomeIcon icon={faPenSquare} size="2x" />
                        </div>
                      </Grid>

                      <div
                        id={this.props.operation.request}
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
                              name={this.props.operation.request}
                              options={
                                this.props.uniqueStatusList
                                  .length > 0 &&
                                this.props.uniqueStatusList[0] !==
                                  ""
                                  ? this.props.uniqueStatusList
                                  : new Array()
                              }
                              defaultValue={
                                this.props.operation.status !== ''
                                  ? this.props.operation.status
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
                                  this.props.operation.request,
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
                                  this.props.operation.request
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
                                  this.props.operation.request
                                )
                              }
                            /> 
                          </Box>
                        </Grid>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {this.props.firstEl ? this.props.operation.request : ""}
                </td>
                <td>
                  {this.props.operation.type === "income"
                    ? this.props.operation.client
                    : ""}
                </td>
                <td>{this.props.operation.organization}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      height:
                        this.props.operation.type === "income" ? "65%" : "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.props.operation.type === "income"
                      ? parseFloat(+this.props.operation.value).toFixed(2) +
                        " руб."
                      : ""}
                  </div>

                  {this.props.operation.type === "income" ? (
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
                      {this.props.operation.date}
                    </div>
                  ) : null}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      height:
                        this.props.operation.type === "outcome"
                          ? "65%"
                          : "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.props.operation.type === "outcome"
                      ? parseFloat(+this.props.operation.value).toFixed(2) +
                        " руб."
                      : ""}
                  </div>

                  {this.props.operation.type === "outcome" ? (
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
                      {this.props.operation.date}
                    </div>
                  ) : null}
                </td>
                <td>
                  {this.props.operation.type === "outcome"
                    ? this.props.operation.client
                    : ""}
                </td>
                <td>{this.props.operation.destination}</td>
                <td>{this.props.operation.comment}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
