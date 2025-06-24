import React, { useState, useEffect} from 'react'
import { useLoaderData } from 'react-router-dom'
import foodImg from '../assets/food.jpg'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../ViewRecipes/search';

export default function RecipeItems(){
const allRecipes=useLoaderData()
const { searchTerm }=useSearch();
const [filteredRecipes, setFilteredRecipes]=useState(allRecipes || [])
const location=useLocation()
const path=location.pathname==="/myRecipe"?true:false
console.log(allRecipes)
useEffect(()=>{
    if(!Array.isArray(allRecipes) || allRecipes.length===0){
        setFilteredRecipes([]); 
        return; 
    }
    const results=allRecipes.filter(item=>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(results);
},[searchTerm,allRecipes]);
const handleDelete=async(id)=>{
    try{
        await axios.delete(`http://localhost:5000/recipe/${id}`)
        window.location.reload()
    }catch(err){
        console.error("Detected error while deleting a recipe:",err.message)
    }
};
const handleLike=async(id)=>{
    try{
        await axios.put(`http://localhost:5000/recipe/like/${id}`);
    }
    catch(err){
        console.error("Cannot like:",err.message);
    }
}
    return(
        <>
            <div className='card-container'>
                {
                    filteredRecipes?.map((items,index)=>{
                        return(
                            <div key={index} className='card'>
                                <img src={`http://localhost:5000/images/${items.image}`} width="120px" height="100px"></img>
                                <div className='card-body'>
                                    <div className='title'>{items.title}</div>
                                    <div className='icons'>
                                        <div className='timer'><BsStopwatchFill/>{items.time}</div>
                                        <div className='action'>
                                            <Link to={`/editRecipe/${items._id}`} className="editicon"><FaEdit/></Link>
                                            <MdDelete className='deleteicon' onClick={()=>handleDelete(items._id)}/>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}