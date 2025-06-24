import React from 'react'
import  {  Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Navbar from './Navbar'

export default function Navigation(){
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}