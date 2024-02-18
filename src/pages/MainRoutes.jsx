import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import UserTodoList from './UserTodoList'
import AdminTodoList from './AdminTodoList'

const MainRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/todolist' element={<UserTodoList />} />
          <Route path='/admintodolist' element={<AdminTodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default MainRoutes