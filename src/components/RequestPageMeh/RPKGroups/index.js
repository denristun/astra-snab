import React from 'react';
import classes from './RPKGroups.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

// Import Swiper React components
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

// install Swiper components
SwiperCore.use([Navigation]);

let insertClasses = [classes.RPKGroups];

class RPKGroups extends React.Component {
  state = {
    groups: [{active: false, group: 'ВСЕ', __v:0, _id: 'ВСЕ'}],
    error: '',
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const url = 'http://sumincrmserver.holod30.ru/api/groups';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();  
      let state = this.state;
      state.groups.push(...data);
      // console.log(state);
            
      this.setState({groups: state.groups});
    } catch (e) {
      this.setState({error: e});
    }
  };

  render() {
    // console.log(this.props);
    return (
      <div className={insertClasses.join(' ')}>
        <div className={classes.Arrow} id='prewArrow'>
          <FontAwesomeIcon icon={faCaretLeft} size='2x' />
        </div>

        <div className={classes.swiperContent}>
          {this.state.error !== '' ? (
            <div>Не удается получить список Групп!</div>
          ) : (
            <Swiper
              slidesPerView={20}
              navigation={{
                nextEl: '#nextArrow',
                prevEl: '#prewArrow',
              }}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {this.state.groups.map((element, index) => {
                let slideClasses = ['slideKis'];
                if (
                  this.props.activeGroup &&
                  this.props.activeGroup === element.group
                ) {
                  slideClasses.push('slideKisActive');
                }
                // console.log(element.group+' || '+this.props.activeGroup);
                return (
                  <SwiperSlide key={index}>
                    <div
                      className={slideClasses.join(' ')}
                      onClick={
                        this.props.activeGroup &&
                        this.props.activeGroup === element.group
                          ? null
                          : this.props.selectGroup.bind(this, element.group)
                      }
                    >
                      {element.group}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>

        <div className={classes.Arrow} id='nextArrow'>
          <FontAwesomeIcon icon={faCaretRight} size='2x' />
        </div>
      </div>
    );
  }
}

export default RPKGroups;
