//import logo from './logo.svg';
import './App.css';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import FileUpload from './Components/FileUpload';


function App() {

  const [files, setFiles] = useState([]);

  const readFile = (file) => {
    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const array =  e.target.result;

        const workbook = XLSX.read(array, {type: "buffer"});
        const worksheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[worksheetName];

        const data = XLSX.utils.sheet_to_json(worksheet);

        resolve(data);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };

    });

    promise.then(data => {
      console.log(data);
      setFiles(JSON.stringify(data));
    });
  };

  return (
    <div className="app">
      <div className='app__header'>
        Spreadsheet Reader
      </div>
      {/* file upload */}
      <FileUpload readFile = {readFile} />

      {/* json display */}
    
      <div className= {files.length > 0 ? 'data__display': 'data__hidden'}>
        <div className='data__heading'>
          JSON Format
        </div>

        <div className='data__json'>
          {files}
        </div>
      </div> 
        
    </div>
  );
}

export default App;
