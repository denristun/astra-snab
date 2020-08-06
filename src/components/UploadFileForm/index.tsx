/** @format */

import React, { useCallback, useState, SyntheticEvent } from 'react'
import { ExcelRenderer } from 'react-excel-renderer'
import { BankDocument } from '../../interfaces/BankDocument'
import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import useStyles from './styles'
import Loader from '../Loader'

const UploadFileForm: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [dbResponse, setDbResponse] = useState([])
  const [checkFileError, setCheckFileError] = useState(false)
  const [uploadFile, setUploadFile] = useState({ name: '' })
  const [uploadData, setUploadData] = useState([])


  const fetchRows = () => {
    
    let documents: BankDocument[]
    documents = []
    uploadData.forEach((row, index) => {
      if (index > 0) {
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
    })

    setUploadData([])

    fetch('http://localhost:8000/api/bank', {
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
      })
      .catch((error) => {
        setLoading(false)
        setUploadFile({ name: '' })
      })
  }

  const onChangeFile = useCallback(
    (event) => {
      const excelFile = event.target.files[0]
      setUploadFile(excelFile)
      setCheckFileError(false)
      renderFile(excelFile)
    },
    [setUploadFile]
  )

  const renderFile = (excelFile: any) => {
    setDbResponse([])
    setLoading(true)
    setUploadData([])
    ExcelRenderer(excelFile, (error: any, response: any) => {
      if (error) {
        setLoading(false)
      } else {
        const isCorrectFile = checkExcelFile(response.rows[0])
        if (!isCorrectFile) {
          setCheckFileError(true)
          setLoading(false)
        }
        else {
          setUploadData(response.rows)
          setLoading(false)
        }
      }
    })
  }

  const formSubmitHandler = (event: SyntheticEvent): void => {
    setLoading(true)
    event.preventDefault()
    fetchRows()
  }

  const checkExcelFile = (rowHeader: []) => {
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
    return JSON.stringify(tableHeader) === JSON.stringify(rowHeader)

  }

  const classes = useStyles()

  return (
    <section className={classes.section}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.form}>
          <input
            accept='excel/*'
            className={classes.input}
            id='contained-button-file'
            multiple
            type='file'
            onChange={onChangeFile}
          />
          <label htmlFor='contained-button-file'>
            <Button
              variant='contained'
              color='primary'
              startIcon={<CloudUploadIcon />}
              component='span'
              disabled={loading}
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
      <div className={classes.alert}>  {uploadData.length>0 && <AlertBox type='info' uploadData={uploadData} />}     </div>
  
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
  let message = ''
  let title = ''
  let type: 'error' | 'info' | 'success' = 'error'
  if (props.message === 'fileError'){
    message = `Неправильный файл для загрузки.
    Файл должен содержать столбцы "Дата|Поступление|Списание|
    Назначение платежа|Контрагент|Чек ожидает отправки в ФНС|Номер чека|Вид операции|Вх.номер|Вх.дата|Организация|Комментарий`
    title = 'Ошибка проверки корректности файла'
    type = 'error'
  }

  if (props.uploadData){
    title = 'Файл готов к загрузке'
    message = `Количество записей ${props.uploadData.length - 1}.`
    type = 'info'
  }

  if (props.response){
      if(!props.response.error){
      message = `Запись под №${props.index} уcпешно добавлена в базу данных`
      title = 'Запись добавлена'
      type = 'success'
    }
    
    else if (props.response.error.name === 'MongoError' && props.response.error.code === 11000){
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
