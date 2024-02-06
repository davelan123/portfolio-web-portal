import { useState } from 'react';
import './App.css';
import BackgroundTemplate from "./components/Background/BackgroundTemplate";
import AntdTable from './components/Table/AntdTable';


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <AntdTable></AntdTable>
    </>
  )
}

export default App
