/** @format */

import React, { useCallback, useState } from 'react';
import './App.css';
import { ExcelRenderer } from 'react-excel-renderer';
import { BankDocument } from './interfaces'

const App: React.FC = () => {

  const parseRows = (rows: []) => {
    let documents: BankDocument[]
    documents = []
    rows.forEach((row)=>{
     let bankDocument = new BankDocument(row[0],row[1],row[2], row[3],row[4], row[10],row[11])
     if (bankDocument.date){
      documents.push(bankDocument)
     }
    })
    console.log({documents})
  }
  

  const [loading, setLoading] = useState(false);
  

  const onChangeHandler = useCallback((event) => {
    setLoading(true);
    const excelFile = event.target.files[0];
    ExcelRenderer(excelFile, (error:any, response:any) => {
      if (error) {
        console.log(error);
      } else {
      parseRows(response.rows)
      }
      setLoading(false)
    });
  }, []);

  return (
    <div>
      <p hidden={!loading}>Loading....</p>
      <input disabled={loading}  type="file" name="file" onChange={onChangeHandler} />
    </div>
  );
}

export default App;
