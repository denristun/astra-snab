/** @format */

import React, { useCallback, useState } from 'react'
import { BankRequest } from '../../interfaces/BankRequest'

const RequestsPage: React.FC = () => {
  const groupBy = (key: any) => (array: any) =>
    array.reduce(
      (objectsByKeyValue, obj) => ({
        ...objectsByKeyValue,
        [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj),
      }),
      {}
    )
  const groupByRequest = groupBy('request')



  const [requests, setRequests] = useState([])
  const onButtonClick = useCallback(
    (event) => {
      setLoading(true)
      fetch('http://localhost:8000/api/bank', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          let r: any
          r = Object.entries(groupByRequest(json))
          setRequests(r)
          setLoading(false)
        })
    },
    [groupByRequest]
  )
  const [loading, setLoading] = useState(false)
  return (
    <div>
        <p hidden={!loading}>Loading....</p>
      <button disabled={loading} onClick={onButtonClick}>
        Получить запросы
      </button>

      {requests.map((request: any) => (
        <div className='requestRow' key={request[0]}>
          {' '}
          <div className='requestRow__header'>{request[0]}</div>
          <div className='requestRow__body'>
            <table className='pure-table pure-table-bordered'>
              <tbody>
                {request[1].map((request: BankRequest) => (
                  <tr key={request._id}>
                    <td>{request.date}</td>
                    <td>{request.type === 'income' ? request.value : ''}</td>
                    <td>{request.type === 'outcome' ? request.value : ''}</td>
                    <td>{request.comment}</td>
                    <td>{request.destination}</td>
                    <td>{request.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RequestsPage
