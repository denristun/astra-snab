import React from 'react';
import classes from './RPKButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

let insertClasses = [classes.RPKButton];

export default (props) => {
  return (
    <div
      id='RPKButton'
      request={props.request}
      onClick={() => props.addOutcome(props.request)}
      className={insertClasses.join(' ')}
    >
      Добавить расход <FontAwesomeIcon icon={faPlusCircle} size='2x' />
    </div>
  );
};
