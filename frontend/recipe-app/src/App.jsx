import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './Pages/Home'
import Navigation from './components/Navigation'
import axios from 'axios'
import AddItems from './Pages/AddItems'
import Edit from './Pages/Edit'
import { Search } from './ViewRecipes/search';

const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get('http://localhost:5000/recipe')
  .then(res=>{
    allRecipes=res.data
  })
  .catch(err=>{
    console.error("Error finding Recipe:",err.message);
  })
  return allRecipes
}
const getMyRecipe=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user?._id)
}
const router=createBrowserRouter([
  {path:"/",element:<Navigation/>,children:[
    {path:"/",element:<Home/>,loader:getAllRecipes},
    {path:"/myRecipe",element:<Home/>,loader:getMyRecipe},
    {path:"/favRecipe",element:<Home/>},
    {path:"/addRecipe",element:<AddItems/>},
    {path:"/editrecipe/:id",element:<Edit/>},
  ]}

])
export default function App(){
  return(
    <>
    <Search>
      <RouterProvider router={router}/>
    </Search>
    </>
  )
}