import { useState } from 'react';
import './App.css';
import BackgroundTemplate from "./components/Background/BackgroundTemplate";


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <BackgroundTemplate></BackgroundTemplate>
    </>
  )
}

export default App
