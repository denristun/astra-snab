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
        tfLabel: "Выберите статус",
        autofocus: false,
        key: Math.random(),
      },
      request: {
        name: "request",
        type: "textfield",
        defaultValue: "",
        variant: "filled",
        label: "Вводите № заявки",
        autofocus: false,
        key: Math.random(),
      },
      // client: {
      //   name: "client",
      //   type: "autocomplete",
      //   tfVariant: "filled",
      //   tfLabel: "Выберите клиента",
      //   autofocus: false,
      //   key: Math.random(),
      // },
      organization: {
        name: "organization",
        type: "autocomplete",
        tfVariant: "filled",
        tfLabel: "Выберите организацию",
        autofocus: false,
        key: Math.random(),
      },
      income: {
        name: "income",
        type: "textfield",
        defaultValue: "",
        variant: "filled",
        label: "Вводите сумму",
        autofocus: false,
        key: Math.random(),
      },
      outcome: {
        name: "outcome",
        type: "textfield",
        defaultValue: "",
        variant: "filled",
        label: "Вводите сумму",
        autofocus: false,
        key: Math.random(),
      },
      invoice: {
        name: "invoice",
        type: "textfield",
        defaultValue: "",
        variant: "filled",
        label: "Вводите сумму",
        autofocus: false,
        key: Math.random(),
      },
      client: {
        name: "client",
        type: "autocomplete",
        tfVariant: "filled",
        tfLabel: "Выберите поставщика",
        autofocus: false,
        key: Math.random(),
      },
      destination: {
        name: "destination",
        type: "textfield",
        defaultValue: "",
        variant: "filled",
        label: "Назначение платежа",
        autofocus: false,
        key: Math.random(),
      },
      comment: {
        name: "comment",
        type: "textfield",
        defaultValue: "",
        variant: "filled",
        label: "Комментарий",
        autofocus: false,
        key: Math.random(),
      },
    },
  };

  updateState = () => {
    const state = this.state;
    Object.keys(this.state.textFields).forEach((textField) => {
      this.state.textFields[textField].key = Math.random();
      this.state.textFields[textField].defaultValue = '';
    });
    this.setState({
      textFields: state.textFields,
    });
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

  focusToFilterLine = (filterLineId) => {
    if (this.state.textFields[filterLineId].type === "textfield") {
      const state = this.state;
      state.textFields[filterLineId].autofocus = true;
      state.textFields[filterLineId].defaultValue = document.querySelector(
        '[name="' + state.textFields[filterLineId].name + '"]'
      ).value;
      state.textFields[filterLineId].key = Math.random();
      // console.log(state.textFields[filterLineId].defaultValue);
      this.setState({
        textFields: state.textFields,
      });
    }
  };

  toggleFilterLine = (filterLineId) => {
    this.closeFilterLines(filterLineId);
    const filterLine = document.querySelector(
      "#" + filterLineId + "[type=filterLine]"
    );
    if (filterLine.getAttribute("display") === "false") {
      filterLine.style.display = "block";
      filterLine.setAttribute("display", "true");
      this.focusToFilterLine(filterLineId);
    } else {
      filterLine.style.display = "none";
      filterLine.setAttribute("display", "false");
    }
  };

  closeFilterLines = (filterLineId = '') => {
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
    if (value && value.trim().length > 0) {
      document.querySelector(
        "#" + filterName + '[type="clearFilterButton"]'
      ).style.display = "inline-block";
    } else {
      document.querySelector(
        "#" + filterName + '[type="clearFilterButton"]'
      ).style.display = "none";
    }

    if (
      this.state.textFields[filterName].type === "autocomplete" &&
      value &&
      value.trim().length > 0
    ) {
      document.querySelector(
        "#" + filterName + "[type=filterLine]"
      ).style.display = "none";
      document
        .querySelector("#" + filterName + "[type=filterLine]")
        .setAttribute("display", "false");
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
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(this.state.textFields.status.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.status.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.status.name)
                    }
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
                          options={
                            this.props.uniqueFilters.uniqueStatusList.length > 0
                              ? this.props.uniqueFilters.uniqueStatusList
                              : new Array()
                          }
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
                          onChange={(event, newInputValue) =>
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.status.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>
                  № Заявки
                  <br />
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
                          autoFocus={this.state.textFields.request.autofocus}
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
                {/* <th>
                  Клиент
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(this.state.textFields.client.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.client.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.client.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.client.name}
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
                          key={this.state.textFields.client.key}
                          name={this.state.textFields.client.name}
                          options={
                            this.props.uniqueFilters.uniqueClientList.length >
                              0 &&
                            this.props.uniqueFilters.uniqueClientList[0] !== ""
                              ? this.props.uniqueFilters.uniqueClientList
                              : new Array()
                          }
                          getOptionLabel={(option) => option}
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={this.state.textFields.client.tfLabel}
                              variant={this.state.textFields.client.tfVariant}
                            />
                          )}
                          // value={this.state.textFields.status.value}
                          onChange={(event, newInputValue) =>
                            this.changeFilterValue(
                              this.state.textFields.client.name,
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.client.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th> */}
                <th>
                  Организация
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(
                        this.state.textFields.organization.name
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.organization.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.organization.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.organization.name}
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
                          key={this.state.textFields.organization.key}
                          name={this.state.textFields.organization.name}
                          options={
                            this.props.uniqueFilters.uniqueOrganizationList
                              .length > 0 &&
                            this.props.uniqueFilters
                              .uniqueOrganizationList[0] !== ""
                              ? this.props.uniqueFilters.uniqueOrganizationList
                              : new Array()
                          }
                          getOptionLabel={(option) => option}
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={this.state.textFields.organization.tfLabel}
                              variant={
                                this.state.textFields.organization.tfVariant
                              }
                            />
                          )}
                          // value={this.state.textFields.status.value}
                          onChange={(event, newInputValue) =>
                            this.changeFilterValue(
                              this.state.textFields.organization.name,
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.organization.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>
                  Поступление
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(this.state.textFields.income.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.income.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.income.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.income.name}
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
                          key={this.state.textFields.income.key}
                          name={this.state.textFields.income.name}
                          variant={this.state.textFields.income.variant}
                          label={this.state.textFields.income.label}
                          autoFocus={this.state.textFields.income.autofocus}
                          defaultValue={
                            this.state.textFields.income.defaultValue
                          }
                          type="number"
                          onChange={(event) =>
                            this.changeFilterValue(
                              this.state.textFields.income.name,
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.income.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>
                  Списание
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(this.state.textFields.outcome.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.outcome.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.outcome.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.outcome.name}
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
                          key={this.state.textFields.outcome.key}
                          name={this.state.textFields.outcome.name}
                          variant={this.state.textFields.outcome.variant}
                          label={this.state.textFields.outcome.label}
                          autoFocus={this.state.textFields.outcome.autofocus}
                          defaultValue={
                            this.state.textFields.outcome.defaultValue
                          }
                          type="number"
                          onChange={(event) =>
                            this.changeFilterValue(
                              this.state.textFields.outcome.name,
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.outcome.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>
                  Накладная
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(this.state.textFields.invoice.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.invoice.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.invoice.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.invoice.name}
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
                          key={this.state.textFields.invoice.key}
                          name={this.state.textFields.invoice.name}
                          variant={this.state.textFields.invoice.variant}
                          label={this.state.textFields.invoice.label}
                          autoFocus={this.state.textFields.invoice.autofocus}
                          defaultValue={
                            this.state.textFields.invoice.defaultValue
                          }
                          type="number"
                          onChange={(event) =>
                            this.changeFilterValue(
                              this.state.textFields.invoice.name,
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.invoice.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>
                  Контрагент
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(this.state.textFields.client.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.client.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.client.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.client.name}
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
                          key={this.state.textFields.client.key}
                          name={this.state.textFields.client.name}
                          options={
                            this.props.uniqueFilters.uniqueClientList.length >
                              0 &&
                            this.props.uniqueFilters.uniqueClientList[0] !==
                              ""
                              ? this.props.uniqueFilters.uniqueClientList
                              : new Array()
                          }
                          getOptionLabel={(option) => option}
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={this.state.textFields.client.tfLabel}
                              variant={this.state.textFields.client.tfVariant}
                            />
                          )}
                          // value={this.state.textFields.status.value}
                          onChange={(event, newInputValue) =>
                            this.changeFilterValue(
                              this.state.textFields.client.name,
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.client.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>
                  Назначение платежа
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(
                        this.state.textFields.destination.name
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.destination.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.destination.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.destination.name}
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
                          key={this.state.textFields.destination.key}
                          name={this.state.textFields.destination.name}
                          variant={this.state.textFields.destination.variant}
                          label={this.state.textFields.destination.label}
                          autoFocus={
                            this.state.textFields.destination.autofocus
                          }
                          defaultValue={
                            this.state.textFields.destination.defaultValue
                          }
                          onChange={(event) =>
                            this.changeFilterValue(
                              this.state.textFields.destination.name,
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.destination.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
                <th>
                  Комментарий
                  <br />
                  <div
                    className={classes.filter}
                    onClick={() =>
                      this.toggleFilterLine(this.state.textFields.comment.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                  </div>
                  <div
                    id={this.state.textFields.comment.name}
                    type="clearFilterButton"
                    className={classes.filter + " " + classes.clearFilter}
                    style={{ backgroundColor: "#C67B7B" }}
                    onClick={() =>
                      this.clearFilter(this.state.textFields.comment.name)
                    }
                  >
                    <FontAwesomeIcon icon={faFilter} size="1x" />
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <div
                    id={this.state.textFields.comment.name}
                    type="filterLine"
                    className={classes.filterLine}
                    style={{ marginLeft: "-100px" }}
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
                          key={this.state.textFields.comment.key}
                          name={this.state.textFields.comment.name}
                          variant={this.state.textFields.comment.variant}
                          label={this.state.textFields.comment.label}
                          autoFocus={this.state.textFields.comment.autofocus}
                          defaultValue={
                            this.state.textFields.comment.defaultValue
                          }
                          onChange={(event) =>
                            this.changeFilterValue(
                              this.state.textFields.comment.name,
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
                          onClick={() =>
                            this.toggleFilterLine(
                              this.state.textFields.comment.name
                            )
                          }
                        />
                      </Box>
                    </Grid>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RPKHeader;
