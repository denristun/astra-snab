import React from "react";
import classes from "./RPKHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCaretLeft,
  // faCaretRight,
  faFilter,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, TextField, Box } from "@material-ui/core";

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

  toggleFilterLine = (filterLineId) => {
    this.closeFilterLines(filterLineId);
    const filterLine = document.querySelector(
      "#" + filterLineId + "[type=filterLine]"
    );
    if (filterLine.getAttribute("display") === "false") {
      filterLine.style.display = "block";
      filterLine.setAttribute("display", "true");
    } else {
      filterLine.style.display = "none";
      filterLine.setAttribute("display", "false");
    }
  };

  closeFilterLines = (filterLineId) => {
    document.querySelectorAll("[type=filterLine]").forEach((filterLine) => {
      if (filterLine.getAttribute("display") === "true" && filterLine.getAttribute("id") !== filterLineId) {
        filterLine.style.display = "none";
        filterLine.setAttribute("display", "false");
      }
    });
  };

  render() {
    return (
      <div id="RPKHeader" className={insertClasses.join(" ")}>
        <div className={classes.RPKHeader__table}>
          <table>
            <tbody>
              <tr>
                <th>
                  Статус
                  <div
                    className={classes.filter}
                    onClick={() => this.toggleFilterLine("status")}
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id="status"
                    type="filterLine"
                    className={classes.filterLine}
                    display="false"
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <TextField
                          name="statusFilter"
                          variant="filled"
                          label="Выберете статус"
                        />
                      </Box>
                      <Box>
                        <FontAwesomeIcon
                          icon={faTimes}
                          size="2x"
                          color="#398def"
                          style={{ cursor: "pointer", padding: "10px" }}
                          onClick={() => this.toggleFilterLine("status")}
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>
                  № Заявки
                  <div
                    className={classes.filter}
                    onClick={() => this.toggleFilterLine("request")}
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id="request"
                    type="filterLine"
                    className={classes.filterLine}
                    display="false"
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <TextField
                          name="requestFilter"
                          variant="filled"
                          label="Вводите № заявки"
                        />
                      </Box>
                      <Box>
                        <FontAwesomeIcon
                          icon={faTimes}
                          size="2x"
                          color="#398def"
                          style={{ cursor: "pointer", padding: "10px" }}
                          onClick={() => this.toggleFilterLine("request")}
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>От кого</th>
                <th>Реализация</th>
                <th>Расход</th>
                {/* <th
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
                </th> */}
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
