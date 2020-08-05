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
  const fetchRows = (rows: []) => {
    let documents: BankDocument[]
    documents = []
    rows.forEach((row, index) => {
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

    fetch('http://localhost:8000/api/bank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documents),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setErrors(json.message)
        setLoading(false)
        setUploadFile({ name: '' })
      })
      .catch((error) => {
        setLoading(false)
        setUploadFile({ name: '' })
      })
  }

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [uploadFile, setUploadFile] = useState({ name: '' })

  const onFileUpload = useCallback(
    (event) => {
      const excelFile = event.target.files[0]
      setUploadFile(excelFile)
      // renderFile(excelFile)
    },
    [setUploadFile]
  )

  const renderFile = (excelFile: any) => {
    setLoading(true)
    ExcelRenderer(excelFile, (error: any, response: any) => {
      if (error) {
        setLoading(false)
      } else {
        fetchRows(response.rows)
      }
    })
  }

  const formSubmitHandler = (event: SyntheticEvent): void => {
    event.preventDefault()
    renderFile(uploadFile)
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
            onChange={onFileUpload}
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
      <div>
        {errors.map((error: any) => (
          <div key={error.bankDocument.id} className={classes.error}>
            <Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              {error.error.name}
            </Alert>
          </div>
        ))}
      </div>
    </section>
  )
}

export default UploadFileForm
