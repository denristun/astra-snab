import React from 'react';
import classes from './RPKHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

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
                <th
                  onClick={() => this.props.sortOperatoions('client')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={classes.sort} style={{marginLeft:'120px'}}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                    <div style={{margin:'15px', display:'inline-block'}}></div>
                    <FontAwesomeIcon icon={faCaretRight} /> 
                  </div>
                  Поставщик
                </th>
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
