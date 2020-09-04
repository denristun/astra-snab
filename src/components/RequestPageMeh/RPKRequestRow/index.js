import React, { useEffect } from 'react'
import classes from './RPKRequestRow.module.scss'
import { request } from 'http'

export default class RPKRequestRow extends React.Component {
  insertClasses = [classes.RPKRequest]
  constructor(props) {
    super(props)
 
  }

  render(){
    return (
        <React.Fragment>
{
    this.props.requestList.map((request) => {
        let status = request.status
        if (status === '') {
          status = 'Без статуса'
        }
        return(
            <div
            key={request._id}
                  onDoubleClick={() =>
                this.props.changeDialog.handleShow(
                  request,
                  this.props.uniqueValues
                )
              }
              className={this.insertClasses.join(" ")}
              operationid={request._id}
              display="true"
            >
              <div className={classes.RPKRequest__table}>
                <table>
                  <tbody>
                    <tr style={{ backgroundColor: this.props.trColor }}>
                      <td style={{
                        backgroundColor: request.status === ''
                          ? '#FDBFBF'
                          : ''
                      }}>
                        <div name='status' id={request._id} status={request._id}>
                          {status}
                        </div>
                      </td>
                      <td name='request' id={request._id} >
                        {this.props.firstEl ?request.request : ""}
                      </td>
                      {/* <td>
                        {this.props.operation.type === "income"
                          ? this.props.operation.client
                          : ""}
                      </td> */}
                      <td name='organization' id={request._id} >{request.organization}</td>
                      <td name='income' id={request._id} >
                        <div
                          style={{
                            display: "flex",
                            flexGrow: 1,
                            height:
                            request.type === "income" ? "65%" : "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {request.type === "income"
                            ? parseFloat(+request.value).toFixed(2) +
                              " руб."
                            : ""}
                        </div>
          
                        {request.type === "income" ? (
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
                            {request.date}
                          </div>
                        ) : null}
                      </td>
                      <td>
                        <div name='outcome' id={request._id}
                          style={{
                            display: "flex",
                            flexGrow: 1,
                            height:
                            request.type === "outcome"
                                ? "65%"
                                : "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {request.type === "outcome"
                            ? parseFloat(+request.value).toFixed(2) +
                              " руб."
                            : ""}
                        </div>
          
                        {request.type === "outcome" ? (
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
                            {request.date}
                          </div>
                        ) : null}
                      </td>
                      <td name='invoice' id={request._id} >
                        <div
                          style={{
                            display: "flex",
                            flexGrow: 1,
                            height:
                            request.type === "invoice"
                                ? "65%"
                                : "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {request.type === "invoice"
                            ? parseFloat(+request.value).toFixed(2) +
                              " руб."
                            : ""}
                        </div>
          
                        {request.type === "invoice" ? (
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
                            {request.date}
                          </div>
                        ) : null}
                      </td>
                      <td name='client' id={request._id} >
                        {request.client}
                      </td>
                      <td name='description' id={request._id} >{request.destination}</td>
                      <td name='client' id={request._id} >{request.comment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        )
    })
    
}
</React.Fragment>

    )

}


}