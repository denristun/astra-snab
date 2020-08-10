// const initialState = {
//   groups: {
//     error: true,
//   },
// };

const initialState = {
  groups: {
    names: [
      'КСН', 'СЕМ', 'МЕВ', 'СМН', 'КЕП', 'КБМ', 'ПСВ', 'СНО', 'СНС', 'СГА', 'СКЛ', 'СУД', 'КРЛ', 'ХРР', 'МСВ', 'СНО', 'СНС', 'СГА', 'СКЛ', 'СУД',
      'КСН', 'СЕМ', 'МЕВ', 'СМН', 'КЕП', 'КБМ', 'ПСВ', 'СНО', 'СНС', 'СГА', 'СКЛ', 'СУД', 'КРЛ', 'ХРР', 'МСВ', 'СНО', 'СНС', 'СГА', 'СКЛ', 'СУД'
    ]
  },
};

export default function groups(state = initialState, action) {
  switch(action.type){
    case 'RENDER_GROUPS':
      return {
        groups: action.data
      }
    default: 
      return state
  }
}