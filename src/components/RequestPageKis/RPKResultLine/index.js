import React from 'react';
import classes from './RPKResultLine.module.scss';

let insertClasses = [classes.RPKResultLine];

export default (props) => {
  return (
    <div id='RPKResultLine' className={insertClasses.join(' ')}>
      <table>
        <tbody>
          <tr style={{ backgroundColor: props.trColor }}>
            <td></td>
            <td></td>
            <td>{props.operation.title}</td>
            <td>{parseFloat(+props.operation.income).toFixed(2)+' руб.'}</td>
            <td>{parseFloat(+props.operation.outcome).toFixed(2)+' руб.'}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
