import React from 'react';
import classes from './RPKButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
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
          Добавить расход <FontAwesomeIcon icon={faPlusCircle} size='2x' />
        </div>

        {this.state.showModal ? (
          <RPKOutcomePage
            request={this.props.request}
            closeModal={this.onToggle}
            clientList={this.props.clientList}
            addOutcomeOperation={this.props.addOutcomeOperation}
          />
        ) : null}
      </div>
    );
  }
}
