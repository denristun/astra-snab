import React from 'react';
import classes from './RPKResultLine.module.scss';

let insertClasses = [classes.RPKResultLine];

export default (props) => {
  return (
    <div id='RPKResultLine' className={insertClasses.join(' ')} operationid={props.operationId} display='true' >
      <table>
        <tbody>
          <tr style={{ backgroundColor: props.trColor }}>
            <td></td>
            <td></td>
            <td>{props.operation.title}</td>
            <td id='income' operationid={props.operationId}>{parseFloat(+props.operation.income).toFixed(2)+' руб.'}</td>
            <td id='outcome' operationid={props.operationId}>{parseFloat(+props.operation.outcome).toFixed(2)+' руб.'}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
