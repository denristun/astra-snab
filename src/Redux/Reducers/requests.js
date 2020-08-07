

// const initialState = {
//   requests: [
//     {
//       status: '5x',
//       requestNumber: '17/657',
//       operations: [
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '15.05.18',
//           bank: '750,00',
//           bankDate: '20.05.18',
//           consumption: '20000,00',
//           consumptionDate: '17.05.19',
//           vendor: 'кол.адвокатов Престиж',
//           bill: '27',
//           billDate: '07.05.18',
//           invoice: 'Счет фактура',
//           serviceType: 'юр.помощь',
//           comment: 'исправить СНО 18/185',
//           calculation: '2000,00'
//         },
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '16.05.18',
//           bank: '',
//           bankDate: '',
//           consumption: '',
//           consumptionDate: '',
//           vendor: '',
//           bill: '',
//           billDate: '',
//           invoice: '',
//           serviceType: '',
//           comment: '',
//           calculation: ''
//         },
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '19.05.18',
//           bank: '7000,00',
//           bankDate: '20.05.18',
//           consumption: '7000,00',
//           consumptionDate: '19.05.19',
//           vendor: 'ифнс по кировскому',
//           bill: '',
//           billDate: '',
//           invoice: '',
//           serviceType: 'госпошлина за рассм. иска',
//           comment: '',
//           calculation: ''
//         }
//       ],
//     },
//     {
//       status: '6x',
//       requestNumber: '17/657',
//       operations: [
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '15.05.18',
//           bank: '750,00',
//           bankDate: '20.05.18',
//           consumption: '20000,00',
//           consumptionDate: '17.05.19',
//           vendor: 'кол.адвокатов Престиж',
//           bill: '27',
//           billDate: '07.05.18',
//           invoice: 'Счет фактура',
//           serviceType: 'юр.помощь',
//           comment: 'исправить СНО 18/185',
//           calculation: '2000,00'
//         },
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '16.05.18',
//           bank: '',
//           bankDate: '',
//           consumption: '',
//           consumptionDate: '',
//           vendor: '',
//           bill: '',
//           billDate: '',
//           invoice: '',
//           serviceType: '',
//           comment: '',
//           calculation: ''
//         },
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '19.05.18',
//           bank: '7000,00',
//           bankDate: '20.05.18',
//           consumption: '7000,00',
//           consumptionDate: '19.05.19',
//           vendor: 'ифнс по кировскому',
//           bill: '',
//           billDate: '',
//           invoice: '',
//           serviceType: 'госпошлина за рассм. иска',
//           comment: '',
//           calculation: ''
//         }
//       ],
//     },
//     {
//       status: '7x',
//       requestNumber: '17/657',
//       operations: [
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '15.05.18',
//           bank: '750,00',
//           bankDate: '20.05.18',
//           consumption: '20000,00',
//           consumptionDate: '17.05.19',
//           vendor: 'кол.адвокатов Престиж',
//           bill: '27',
//           billDate: '07.05.18',
//           invoice: 'Счет фактура',
//           serviceType: 'юр.помощь',
//           comment: 'исправить СНО 18/185',
//           calculation: '2000,00'
//         },
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '16.05.18',
//           bank: '',
//           bankDate: '',
//           consumption: '',
//           consumptionDate: '',
//           vendor: '',
//           bill: '',
//           billDate: '',
//           invoice: '',
//           serviceType: '',
//           comment: '',
//           calculation: ''
//         },
//         {
//           at: 'AC',
//           to: 'водоканал',
//           realization: '40000,00',
//           realizationDate: '19.05.18',
//           bank: '7000,00',
//           bankDate: '20.05.18',
//           consumption: '7000,00',
//           consumptionDate: '19.05.19',
//           vendor: 'ифнс по кировскому',
//           bill: '',
//           billDate: '',
//           invoice: '',
//           serviceType: 'госпошлина за рассм. иска',
//           comment: '',
//           calculation: ''
//         }
//       ],
//     }
//   ]
// };

const initialState = {
  requests: {
    error: true,
  },
};

export default function requests(state = initialState, action) {
  switch (action.type) {
    case 'RENDER_DATA':
      return {
        requests: action.data,
      };
    default:
      return state;
  }

  // return state;
}
