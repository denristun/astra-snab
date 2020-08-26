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
import Autocomplete from "@material-ui/lab/Autocomplete";

let insertClasses = [classes.RPKHeader];
function headerShift(elem, param) {
  elem.style.paddingTop = param;
}

class RPKHeader extends React.Component {
  state = {
    textFields: {
      status: {
        name: "status",
        type: "autocomplete",
        tfVariant: "filled",
        tfLabel: "Выберете статус",
        value: "",
        key: Math.random(),
      },
      request: {
        name: "request",
        type: "textfield",
        variant: "filled",
        label: "Вводите № заявки",
        defaultValue: "",
        key: Math.random(),
      },
    },
  };

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
      if (
        filterLine.getAttribute("display") === "true" &&
        filterLine.getAttribute("id") !== filterLineId
      ) {
        filterLine.style.display = "none";
        filterLine.setAttribute("display", "false");
      }
    });
  };

  clearFilter = (filterName) => {
    document.querySelector(
      "#" + filterName + '[type="clearFilterButton"]'
    ).style.display = "none";

    const state = this.state;
    state.textFields[filterName].key = Math.random();
    this.setState({
      textFields: state.textFields,
    });

    this.props.changeFilter(filterName, "");

    document.querySelectorAll("[type=filterLine]").forEach((filterLine) => {
      filterLine.style.display = "none";
      filterLine.setAttribute("display", "false");
    });
  };

  changeFilterValue = (filterName, value) => {
    if (value.trim().length > 0) {
      document.querySelector(
        "#" + filterName + '[type="clearFilterButton"]'
      ).style.display = "inline-block";
    } else {
      document.querySelector(
        "#" + filterName + '[type="clearFilterButton"]'
      ).style.display = "none";
    }

    this.props.changeFilter(filterName, value);
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
                    id={this.state.textFields.status.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() => this.clearFilter("status")}
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.status.name}
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
                        <Autocomplete
                          key={this.state.textFields.status.key}
                          name={this.state.textFields.status.name}
                          // options={
                          //   this.props.uniqueFilters.uniqueStatusList.length > 0 && this.props.uniqueFilters.uniqueStatusList[0] !== ''
                          //     ? this.props.uniqueFilters.uniqueStatusList
                          //     : new Array
                          // }
                          options={this.props.uniqueFilters.uniqueClientList}
                          getOptionLabel={(option) => option}
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={this.state.textFields.status.tfLabel}
                              variant={this.state.textFields.status.tfVariant}
                            />
                          )}
                          // value={this.state.textFields.status.value}
                          onInputChange={(event, newInputValue) =>
                            this.changeFilterValue(
                              this.state.textFields.status.name,
                              newInputValue
                            )
                          }
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
                    id={this.state.textFields.request.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() => this.clearFilter("request")}
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.request.name}
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
                          key={this.state.textFields.request.key}
                          name={this.state.textFields.request.name}
                          variant={this.state.textFields.request.variant}
                          label={this.state.textFields.request.label}
                          defaultValue={
                            this.state.textFields.request.defaultValue
                          }
                          onChange={(event) =>
                            this.changeFilterValue(
                              "request",
                              event.target.value
                            )
                          }
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
                <th>Клиент</th>
                <th>Организация</th>
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
