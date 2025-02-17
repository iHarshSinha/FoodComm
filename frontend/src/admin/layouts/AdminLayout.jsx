import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const AdminLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="light"
      />

    </>
  )
}

export default AdminLayout