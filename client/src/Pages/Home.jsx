import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

function Home() {

  return (
    <div className='container mt-5 p-5'>
       <Outlet/>
    </div>
  )
}

export default Home