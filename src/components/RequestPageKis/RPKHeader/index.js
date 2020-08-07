import React from 'react';
import classes from './RPKHeader.module.scss';

let insertClasses = [classes.RPKHeader];
function headerShift(elem, param) {
  elem.style.paddingTop = param;
}

class RPKHeader extends React.Component {
  componentDidMount() {
    const RPKHeaderContainer = document.querySelector('[id="RPKHeader"]');
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 10) {
        headerShift(RPKHeaderContainer, 0);
      } else {
        headerShift(RPKHeaderContainer, null);
      }
    });
  }

  render() {
    return (
      <div id='RPKHeader' className={insertClasses.join(' ')}>
        <div className={classes.RPKHeader__table}>
          <table>
            <tbody>
              <tr>
                <th>Статус</th>
                <th>№ Заявки</th>
                <th>От кого</th>
                <th>Реализация</th>
                <th>Расход</th>
                <th>Поставщик</th>
                <th>Назначение платежа</th>
                <th>Комментарий</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RPKHeader;
