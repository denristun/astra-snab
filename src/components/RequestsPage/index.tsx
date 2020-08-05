/** @format */

import React, { useCallback, useState } from 'react'
import { BankRequest } from '../../interfaces/BankRequest'

import useStyles from './styles'
import Cell from './Cell'

const RequestsPage: React.FC = () => {

  const classes = useStyles()

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
    <section>
       <div className={classes.table}>
         <div className={classes.table__header}>
           <Cell text='Статус' />
           <Cell text='№ Заявки11'/>
           <Cell text='№ Заявки111'/>
           <Cell text='№ Заявки111111'/>
         </div>
         <div className={classes.table__rowData}>
         <Cell text='11'/>
          <Cell text='111'/>
         </div>
       </div>




       <div className={classes.result}></div>
       <div className={classes.managers}></div>

    </section>
   







  

     
   
  )
}

export default RequestsPage
