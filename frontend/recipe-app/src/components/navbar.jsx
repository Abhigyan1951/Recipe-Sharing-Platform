import React from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../ViewRecipes/search"

export default function Navbar(){
    const { searchTerm, setSearchTerm}=useSearch();
    return(
        <>
            <header>
                <h2>Recipe App</h2>
                <ul>
                    <div className="nav">
                    <li>
                    <Link to="/" style={{textDecoration:'none',color:'inherit'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <span>Home</span>
                    </Link>
                    </li>
                    </div>
                    <li>
                    <Link to="/myRecipe" style={{textDecoration: 'none',color: 'inherit'}}>🍲Recipes</Link>
                    </li>
                </ul>
                <input type="text" placeholder="Search Recipes" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}
                style={{
                    padding:"6px 12px",
                    borderRadius:"4px",
                    border:"1px solid black",
                    marginLeft:"20px"
                }}/>
            </header>
        </>
    );
}