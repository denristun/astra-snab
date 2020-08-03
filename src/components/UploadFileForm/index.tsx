/** @format */

import React, { useCallback, useState } from 'react'
import { ExcelRenderer } from 'react-excel-renderer'
import { BankDocument } from '../../interfaces/BankDocument'
import { Button, CircularProgress } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import useStyles from './styles'

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
        setLoading(false)
      })
  }

  const [loading, setLoading] = useState(false)

  const onFileUpload = useCallback((event) => {
    setLoading(true)
    const excelFile = event.target.files[0]
    renderFile(excelFile)
  }, [])

  const renderFile = ((excelFile: any)=>{
    setLoading(true)
    ExcelRenderer(excelFile, (error: any, response: any) => {
      if (error) {
        setLoading(false)
      } else {
        fetchRows(response.rows)
      }
     
    })
  })

  const classes = useStyles()

  return (
    <section className={classes.section}>
      {loading && <CircularProgress />}

      <form>
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
          >
            Загрузка excel
          </Button>

     
        </label>
      </form>
    </section>
  )
}

export default UploadFileForm
