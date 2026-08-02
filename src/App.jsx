import { Routes, Route } from 'react-router-dom'

import AdminPage from './pages/AdminPage'
import InvitationPage from './pages/InvitationPage'



function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<InvitationPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
      </Routes>
      
    </>
  )
}

export default App
