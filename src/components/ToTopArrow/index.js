import React from "react";
import classes from "./ToTopArrow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";

window.addEventListener("scroll", () => {
  const elem = document.querySelector("#ToTopArrow");
  if (window.pageYOffset > 300) {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
});

export default class ToTopArrow extends React.Component {
  insertClasses = [classes.ToTopArrow];

  toTop = () => {
    const element = document.querySelector('header');
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  };

  render() {
    return (
      <div
        id="ToTopArrow"
        className={this.insertClasses.join(" ")}
        onClick={this.toTop}
      >
        <FontAwesomeIcon icon={faArrowAltCircleUp} size="4x" />
      </div>
    );
  }
}
