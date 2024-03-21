import React, {useState} from 'react';
import './App.css';
import {ReusableInput} from "./components/ReusableInput";
import {Box} from "@mui/material";
import {ReusableTable} from "./components/ReusableTable";
import data from "../src/mocked/mock.json"

function App() {
    const [inputValue, setInputValue] = useState('')
    const onInputChange = (value: string) => {
        setInputValue(value);
    }

  return (
    <div className="container">
        <Box sx={{ maxWidth: '100%', height: '100%', pl: 10, pr: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
            <ReusableInput initialValue={inputValue} onChangeHandler={onInputChange}/>
            <ReusableTable data={data} filter={inputValue} headers={['Avatar', 'First name', 'Last name', 'Email address', 'Ethereum address', 'IP Address']} settings={{ headerHeight: 30, rowHeight: 30, stripedRows: true }}/>
        </Box>
    </div>
  );
}

export default App;
