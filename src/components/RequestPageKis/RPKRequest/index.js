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
                  <div name='status' id={this.state.operation._id} status={this.state.operation._id}>                    
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
                          this.props.changeStatusForm(this.state.operation)
                        }
                      >
                        <FontAwesomeIcon icon={faPenSquare} size="2x" />
                      </div>
                    </Grid>
                  </div>
                  
                </td>
                <td name='request' id={this.state.operation._id} >
                  {this.props.firstEl ? this.state.operation.request : ""}
                </td>
                <td name='organization' id={this.state.operation._id} >{this.state.operation.organization}</td>
                <td name='income' id={this.state.operation._id} >
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
                  <div name='outcome' id={this.state.operation._id}
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
                <td name='invoice' id={this.state.operation._id} >
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
                <td name='client' id={this.state.operation._id} >
                  {this.state.operation.client}
                </td>
                <td name='description' id={this.state.operation._id} >{this.state.operation.destination}</td>
                <td name='client' id={this.state.operation._id} >{this.state.operation.comment}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
