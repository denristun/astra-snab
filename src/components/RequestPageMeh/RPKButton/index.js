import React from 'react';
import classes from './RPKButton.module.scss';
import RPKOutcomePage from '../RPKOutcomePage';

let insertClasses = [classes.RPKButton];

export default class RPKButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  onToggle = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    return (
      <div id='RPKButton' className={insertClasses.join(' ')}  operationid={this.props.operationId} display='true' >
        <div className={classes.RPKButton__add} onClick={() => this.onToggle()}>
          Добавить расход 
        </div>

        {this.state.showModal ? (
          <RPKOutcomePage
            request={this.props.request}
            closeModal={this.onToggle}
            uniqueValues={this.props.uniqueValues}
            addOutcomeOperation={this.props.addOutcomeOperation}
          />
        ) : null}
      </div>
    );
  }
}
