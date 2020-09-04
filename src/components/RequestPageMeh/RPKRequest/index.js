import React, { useEffect } from 'react'
import classes from './RPKRequest.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenSquare,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { Grid, TextField, Box } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import requests from '../../../Redux/Reducers/requests'
import RPKButton from '../RPKButton'
import RPKRequestRow from '../RPKRequestRow'

export default class RPKRequest extends React.Component {
  insertClasses = [classes.RPKRequest]
  constructor(props) {
    super(props)
    this.state = {
      requests: this.props.requests,
    }
  }

  componentWillUpdate() {
    // console.log(this.state.requests)
  }

  toggleStatusLine = (requestId) => {
    const element = document.querySelector(
      '[id="' + requestId + '"][type="statusLine"]'
    )
    if (element.getAttribute('display') === 'false') {
      element.setAttribute('display', 'true')
      element.style.display = 'block'
    } else {
      element.setAttribute('display', 'false')
      element.style.display = null
    }
  }

  applyStatus = () => {
    const state = this.state
    state.operation.status = this.newStatus

    const oldStatus = document.querySelector(
      '[status="' + this.state.operation._id + '"]'
    ).textContent

    this.props.applyRequestStatus(state.operation, oldStatus, this.newStatus)

    state.autocomplete.push(this.newStatus)
    state.autocomplete = state.autocomplete.filter((el) => el !== oldStatus)

    // console.log(state.autocomplete);

    state.key = Math.random()
    this.setState({
      ...state,
    })
  }

  changeStatusHandler = (operationId, value) => {
    this.newStatus = value
    // console.log(this.newStatus);
  }

  requestRow = (requestList) => {
    let operations = []
    for (let i = 0; i < requestList.length; i++) {
      let status = requestList[i].status
      if (status === '') {
        status = 'Без статуса'
      }
      operations.push(
        <div
          key={requestList[i]._id}
          onDoubleClick={() =>
            this.props.changeDialog.handleShow(
              requestList[i],
              this.props.uniqueValues
            )
          }
          className={this.insertClasses.join(' ')}
          operationid={requestList[i]._id}
          display="true"
        >
          <div className={classes.RPKRequest__table}>
            <table>
              <tbody>
                <tr style={{ backgroundColor: this.props.trColor }}>
                  <td
                    style={{
                      backgroundColor:
                        requestList[i].status === '' ? '#FDBFBF' : '',
                    }}
                  >
                    <div
                      name="status"
                      id={requestList[i]._id}
                      status={requestList[i]._id}
                    >
                      {status}
                    </div>
                  </td>
                  <td name="request" id={requestList[i]._id}>
                    {this.props.firstEl ? requestList[i].request : ''}
                  </td>
                  {/* <td>
              {this.props.operation.type === "income"
                ? this.props.operation.client
                : ""}
            </td> */}
                  <td name="organization" id={requestList[i]._id}>
                    {requestList[i].organization}
                  </td>
                  <td name="income" id={requestList[i]._id}>
                    <div
                      style={{
                        display: 'flex',
                        flexGrow: 1,
                        height:
                          requestList[i].type === 'income' ? '65%' : '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {requestList[i].type === 'income'
                        ? parseFloat(+requestList[i].value).toFixed(2) + ' руб.'
                        : ''}
                    </div>

                    {requestList[i].type === 'income' ? (
                      <div
                        style={{
                          display: 'flex',
                          flexGrow: 1,
                          height: '35%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#FFF5C2',
                        }}
                      >
                        {requestList[i].date}
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <div
                      name="outcome"
                      id={requestList[i]._id}
                      style={{
                        display: 'flex',
                        flexGrow: 1,
                        height:
                          requestList[i].type === 'outcome' ? '65%' : '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {requestList[i].type === 'outcome'
                        ? parseFloat(+requestList[i].value).toFixed(2) + ' руб.'
                        : ''}
                    </div>

                    {requestList[i].type === 'outcome' ? (
                      <div
                        style={{
                          display: 'flex',
                          flexGrow: 1,
                          height: '35%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#FFF5C2',
                        }}
                      >
                        {requestList[i].date}
                      </div>
                    ) : null}
                  </td>
                  <td name="invoice" id={requestList[i]._id}>
                    <div
                      style={{
                        display: 'flex',
                        flexGrow: 1,
                        height:
                          requestList[i].type === 'invoice' ? '65%' : '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {requestList[i].type === 'invoice'
                        ? parseFloat(+requestList[i].value).toFixed(2) + ' руб.'
                        : ''}
                    </div>

                    {requestList[i].type === 'invoice' ? (
                      <div
                        style={{
                          display: 'flex',
                          flexGrow: 1,
                          height: '35%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#FFF5C2',
                        }}
                      >
                        {requestList[i].date}
                      </div>
                    ) : null}
                  </td>
                  <td name="client" id={requestList[i]._id}>
                    {requestList[i].client}
                  </td>
                  <td name="description" id={requestList[i]._id}>
                    {requestList[i].destination}
                  </td>
                  <td name="client" id={requestList[i]._id}>
                    {requestList[i].comment}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    return operations
  }

  generateRequests = () => {
    let operations = []
  }

  render() {
    // let status = this.state.operation.status;
    // if (status === "" ) {
    //   status = 'Без статуса';
    // }

    return (
      <React.Fragment>
        {this.props.requests.map((request, index) => {
          //  operations.push(
          //    <div>{request[0]}</div>
          //  )
          //  operations.push(this.requestRow(request[1]))
          return (
          <React.Fragment key={request[0]}>
             <div>{request[0]}</div>
            <RPKRequestRow 
            requestList={request[1]} 
            changeDialog={this.props.changeDialog}
            uniqueValues={this.props.uniqueValues} 
            
            />

            <React.Fragment key={index.toString() + Math.random()}>
              <div
                type="additional"
                id={request[0]}
                key={index.toString() + Math.random()}
              ></div>
              <RPKButton
                key={index.toString() + Math.random()}
                request={request[0]}
                uniqueValues={this.props.uniqueValues}
                operationId={1}
                // addOutcomeOperation={this.addOutcomeOperation}
              />
            </React.Fragment>
          </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }
}
