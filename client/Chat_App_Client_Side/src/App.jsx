
import { Outlet } from 'react-router-dom'
import './App.css'
import {Toaster} from "react-hot-toast"

function App() {
 

  return (
<>
<div >
  <Toaster/>
  <Outlet/>  {/*use to navigate on children components */}
</div>
</>
  )
}

export default App
