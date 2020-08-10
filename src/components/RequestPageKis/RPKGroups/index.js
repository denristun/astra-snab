import React from 'react';
import classes from './RPKGroups.module.scss';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

let insertClasses = [classes.RPKGroups];

class RPKGroups extends React.Component {
  componentDidMount() {
    // this.getData();
  }

  getData = async () => {
    const url = 'http://10.36.2.56:8000/api/groups';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      this.props.renderData(data);
      // console.log(data);
    } catch (e) {
      // console.log(e);
      this.props.renderData({ error: e });
    }
  };

  render() {
    return (
      <div className={insertClasses.join(' ')}>
        <div className={classes.Arrow}>
          <FontAwesomeIcon icon={faCaretLeft} size='2x' />
        </div>

        <div className={classes.swiperContent}>
          {this.props.groups.error ? (
            <div>Не удается получить список Групп!</div>
          ) : (
            <Swiper
              slidesPerView={20}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {this.props.groups.names.map((element, index) => {
                return <SwiperSlide key={index} >{element}</SwiperSlide>;
              })}
            </Swiper>
          )}
        </div>

        <div className={classes.Arrow}>
          <FontAwesomeIcon icon={faCaretRight} size='2x' />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.groups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    renderData: (data) => dispatch({ type: 'RENDER_GROUPS', data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RPKGroups);
