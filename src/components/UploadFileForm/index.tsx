/** @format */

import React, { useCallback, useState, SyntheticEvent } from 'react'
import { ExcelRenderer } from 'react-excel-renderer'
import { BankDocument } from '../../interfaces/BankDocument'
import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import useStyles from './styles'
import Loader from '../Loader'
import { AlertMessage } from '../../interfaces/AlertMessage'
import { BankRequest } from '../../interfaces/BankRequest'

const UploadFileForm: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [dbResponse, setDbResponse] = useState([])
  const [checkFileError, setCheckFileError] = useState(false)
  const [uploadFile, setUploadFile] = useState({ name: '' })
  const [uploadData, setUploadData] = useState([])
  const [uploadDocuments, setUploadDocuments] = useState(BankDocument[0])
  const [alerts, setAlerts] = useState(AlertMessage[0])

  const prepareRequests = (upload) => {
    setAlerts([])
    setLoading(true)
    let documents: BankDocument[] = []
    let alertsMessages: AlertMessage[] = []
    upload.forEach((row, index) => {
      if (index > 0) {
        if (checkCommentCell(row[11]) ){
          let bankDocument = new BankDocument(
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            row[10],
            row[11]
          )
          if (bankDocument.date) {
            documents.push(bankDocument)
          }
        }
        else{
          const message = `Проверьте корректность поля "Коментарий" в строке №${index + 1} "${row[11] ? row[11]: 'Пустая ячейка'}"`
          const commentAlert = new AlertMessage('warning', message,'commentError')
          alertsMessages.push(commentAlert)
        }
      
      }
    })
    setAlerts(alertsMessages)
    setUploadData([])
    setUploadDocuments(documents)
    console.log(documents)
    setLoading(false)
  }

  const checkCommentCell = (commentCell: string) => {
    const requestRegExp = new RegExp('([а-я,А-Я]{3}-[0-9]{1,2}\/[0-9]{1,6}( |(\/[0-9,а-я,А-Я]{1,3}){1,4} )[0-9]{1,10}(,|.)[0-9]{1,2}(|$)[^;]{1,50}(;|$)){1,10}', 'gi')
    const requestRegExp2 = new RegExp('[а-я,А-Я]{3}-[0-9]{1,2}\/[0-9]{1,6}((\/[0-9,а-я,А-Я]{1,3}){1,4}|$)$')
    const requestRegExp3 = new RegExp('^[а-я,А-Я]{3}-[0-9]{1,2}\/[0-9]{1,6}( |(\/[0-9,а-я,А-Я]{1,3}){1,4} )[^;]{1,255}$')

    if (commentCell){
    const semicolonCount = (commentCell.match(/;/g) || []).length + 1
      return ((commentCell.match(requestRegExp) || []).length === semicolonCount)
      || (commentCell.match(requestRegExp2) || []).length 
      || (commentCell.match(requestRegExp3) || []).length
    }
  }

  const fetchDocuments = (documents) => {
    fetch('https://astra-snab-server.herokuapp.com/api/bank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documents),
    })
      .then((response) => response.json())
      .then((json) => {
        setDbResponse(json.message)
        setLoading(false)
        setUploadFile({ name: '' })
        setAlerts([])
        setUploadDocuments(null)
      })
      .catch((error) => {
        setLoading(false)
        setUploadFile({ name: '' })
        setAlerts([])
        setUploadDocuments(null)
      })
  }

  const onChangeFile = useCallback(
    async (event) => {
      setAlerts([])
      setUploadDocuments(BankDocument[0])
      const excelFile = event.target.files[0]
      event.target.value = ''
      setUploadFile(excelFile)
      setCheckFileError(false)
     const upload = await renderFile(excelFile)
     const isCorrectFile = await checkExcelFile(upload.rows[0])
        if (!isCorrectFile) {
          setCheckFileError(true)
          setLoading(false)
        }
        else{
          prepareRequests(upload.rows.filter(e => e.length))
        }
    },
    [setUploadFile, setUploadData]
  )

  const renderFile = async (excelFile: any) => {
    setDbResponse([])
    setLoading(true)
    setUploadData([])
    return await ExcelRenderer(excelFile, (error: any, response: any) => {
    })
  }

  const formSubmitHandler = (event: SyntheticEvent): void => {
    setLoading(true)
    event.preventDefault()
    fetchDocuments(uploadDocuments)
  }

  const checkExcelFile = async (rowHeader: []) => {
    const tableHeader = ['Дата',
      'Поступление',
      'Списание',
      'Назначение платежа',
      'Контрагент',
      'Чек ожидает отправки в ФНС',
      'Номер чека', 'Вид операции',
      'Вх.номер',
      'Вх.дата',
      'Организация',
      'Комментарий'
    ]
    return await JSON.stringify(tableHeader) === JSON.stringify(rowHeader)
  }

  const classes = useStyles()

  return (
    <section className={classes.section}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.form}>
          <input
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            className={classes.input}
            id='contained-button-file'
            multiple
            type='file'
            onChange={onChangeFile}
            disabled={loading || !!uploadFile.name}
          />
          <label htmlFor='contained-button-file'>
            <Button
              variant='contained'
              color='primary'
              startIcon={<CloudUploadIcon />}
              component='span'
              disabled={loading || !!uploadFile.name}
            >
              Выбрать файл
            </Button>
          </label>
          <div className={classes.fileName}>{uploadFile.name}</div>
          {!!uploadFile.name && (
            <Button
              disabled={!uploadFile.name || loading}
              type='submit'
              variant='contained'
              color='primary'
            >
              Загрузить
            </Button>
          )}
        </div>
      </form>

      {loading && <Loader />}
      <div className={classes.alert}>  {checkFileError && <AlertBox type='error' message='fileError' />}     </div>
      <div className={classes.alert}>  {uploadDocuments && <AlertBox type='info' uploadDocuments={uploadDocuments} alerts={alerts}/>}     </div>
      {alerts &&
       
 alerts.map((alert: AlertMessage, index)=>(
  <div key={index}  className={classes.alert}>  {<AlertBox type={alert.type} message={alert.message} />}</div>
 ))
     
}
      <div>
        {dbResponse.map((response: any, index) => (
          <div key={response.bankDocument.id} className={classes.alert}>
            <AlertBox response={response} index={index + 2} />
          </div>
        ))}
      </div>
    </section>
  )
}

function AlertBox(props) {
  let message = props.message
  let title = ''
  let type: 'error' | 'info' | 'success'| 'warning' = props.type 
  if (props.message === 'fileError') {
    message = `Неправильный файл для загрузки.
    Файл должен содержать столбцы "Дата|Поступление|Списание|
    Назначение платежа|Контрагент|Чек ожидает отправки в ФНС|Номер чека|Вид операции|Вх.номер|Вх.дата|Организация|Комментарий`
    title = 'Ошибка проверки корректности файла'
    type = 'error'
  }

  if (props.uploadDocuments) {
    title = `Файл готов к загрузке. Всего записей ${props.uploadDocuments.length + props.alerts.length}.` 
    message = `Корректных ${props.uploadDocuments.length} шт. С ошибками ${props.alerts.length} шт.`
    type = 'info'
  }

  if (props.response) {
    if (!props.response.error) {
      message = `Запись под №${props.index} уcпешно добавлена в базу данных`
      title = 'Запись добавлена'
      type = 'success'
    }

    else if (props.response.error.name === 'MongoError' && props.response.error.code === 11000) {
      message = `Запись под №${props.index} уже имеется в базе данных`
      title = 'Ошибка добавления в базу данных'
      type = 'error'
    }
  }

  return (
    <Alert severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  )
}


export default UploadFileForm
