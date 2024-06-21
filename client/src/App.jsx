import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/login/Login.jsx'
import {Login} from './components/login/Login.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div >
      <Login/>
    </div>
    </>
  )
}

export default App
