import React, { useEffect } from 'react'
import classes from './RPKRequest.module.scss'
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

  stateUpdate = (requests) => {
    this.setState({requests});
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


  render() {
// console.log(classes)
    return (
      <React.Fragment>
        {this.props.requests.map((request, index) => {
          return (
          <React.Fragment key={request[0]}>
             <div className={classes.requestHeader}>{request[0]}</div>
            <RPKRequestRow 
            requestList={request[1]} 
            changeDialog={this.props.changeDialog}
            uniqueValues={this.props.uniqueValues} 
            changeStatusForm={this.props.changeStatusForm}
            
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
                addOutcomeOperation={this.props.addOutcomeOperation}
              />
                 
            </React.Fragment>
          </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }
}
