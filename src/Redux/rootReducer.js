import {combineReducers} from 'redux';

import requests from './Reducers/requests';
import groups from './Reducers/groups';

export default combineReducers({
  requests, groups
})