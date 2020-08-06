import React from 'react';
import classes from './RPKHeader.module.scss';

let insertClasses = [classes.RPKHeader];
function headerShift(elem: any, param: any): void {
  elem.style.paddingTop = param;
  // elem.style.transition = 'margin-top 1s ease-in-out';
}

class RPKHeader extends React.Component {
  componentDidMount() {
    const RPKHeaderContainer: any = document.querySelector('[id="RPKHeader"]');
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
            <tr>
              <th>Статус</th>
              <th>№ Заявки</th>
              <th>От кого</th>
              <th>Кому</th>
              <th>Реализация</th>
              <th>Банк</th>
              <th>Расход</th>
              <th>Поставщик</th>
              <th>Счет</th>
              <th>Счет фактура</th>
              <th>Наименование</th>
              <th>Комментарий</th>
              <th>Расчет</th>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}


export default RPKHeader;
