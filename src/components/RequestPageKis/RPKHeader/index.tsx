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
    console.log(document.querySelector('#RPKHeader'));
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 0) {
        headerShift(RPKHeaderContainer, 0);
      } else {
        headerShift(RPKHeaderContainer, null);
      }
    });
  }

  render() {
    return (
      <div id='RPKHeader' className={insertClasses.join(' ')}>
        RPKHeader
      </div>
    );
  }
}


export default RPKHeader;
