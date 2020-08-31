const initialState = {
  requests: {
    error: true,
  },
};

export default function requests(state = initialState, action) {
  switch (action.type) {
    case 'RENDER_DATA':
      // console.log('RENDER_DATA');
      return {
        requests: action.data,
      };
    default:
      return state;
  }

  // return state;
}
