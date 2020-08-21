import React from "react";
import classes from "./RPKHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

let insertClasses = [classes.RPKHeader];
function headerShift(elem, param) {
  elem.style.paddingTop = param;
}

class RPKHeader extends React.Component {
  componentDidMount() {
    const RPKHeaderContainer = document.querySelector('[id="RPKHeader"]');
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 10) {
        headerShift(RPKHeaderContainer, 0);
      } else {
        headerShift(RPKHeaderContainer, null);
      }
    });
  }

  render() {
    return (
      <div id="RPKHeader" className={insertClasses.join(" ")}>
        <div className={classes.RPKHeader__table}>
          <table>
            <tbody>
              <tr>
                <th>Статус</th>
                <th>№ Заявки</th>
                <th>От кого</th>
                <th>Реализация</th>
                <th
                  onClick={() => this.props.sortOperatoions("value")}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div className={classes.sort}>
                      <FontAwesomeIcon icon={faCaretLeft} />
                      <div
                        style={{ margin: "15px", display: "inline-block" }}
                      ></div>
                      <FontAwesomeIcon icon={faCaretRight} />
                    </div>
                    <div
                      style={{
                        display: "block",
                      }}
                    >
                      Расход
                    </div>
                  </div>
                </th>
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
