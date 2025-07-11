import axios from 'axios'
import React, {useEffect, useState} from'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function EditItems() {
    const [recipeData,setRecipeData]=useState({})
    const navigate=useNavigate()
    const{id}=useParams()
    useEffect(()=>{
        const getData=async()=>{
            await axios.get(`http://localhost:5000/recipe/${id}`)
            .then(response=>{
                let res=response.data
                setRecipeData({
                    title:res.title,
                    ingredients:res.ingredients.join(","),
                    instructions:res.instructions,
                    time:res.time
                })
            })
        }
        getData()
    })
    const onHandleChange=(e)=>{
        let x=(e.target.name==="ingredients")?e.target.value.split(","):(e.target.name==="file")?e.target.files[0]:e.target.value
        setRecipeData(pre=>({...pre,[e.target.name]:x}))
    }
    const onHandleSubmit=async(e)=>{
        e.preventDefault()
        console.log("Recipe Data:",recipeData)
        await axios.put(`http://localhost:5000/recipe/${id}`,recipeData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then(()=>navigate("/myRecipe"))
        .catch((err) => console.error('Submission error:',err))
    }
    return (
        <>
         <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title}></input>
                </div>
                <div className='form-control'>
                    <label>Time</label>
                    <input type="text" className='input' name="time" onChange={onHandleChange} value={recipeData.time}></input>
                </div>
                <div className='form-control'>
                    <label>Ingredients</label>
                    <textarea type="text" className='input-textarea' name="ingredients" rows="6" onChange={onHandleChange} value={recipeData.ingredients}></textarea>
                </div>
                <div className='form-control'>
                    <label>Instructions</label>
                    <textarea type="text" className='input-textarea' name="instructions" rows="6" onChange={onHandleChange} value={recipeData.instructions}></textarea>
                </div>
                <div className='form-control'>
                    <label>Recipe Image</label>
                    <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                </div>
                <button type="submit">Edit Recipe</button>
            </form>
         </div>
        </>
    )
}