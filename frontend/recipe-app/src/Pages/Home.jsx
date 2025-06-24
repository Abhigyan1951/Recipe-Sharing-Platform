import React from 'react'
import food from '../assets/food.jpg'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'

export default function Home(){
    const navigate=useNavigate()
    return(
        <>
            <section className='home'>
                <div className='left'>
                    <h1>About Food Recipe</h1>
                    <h5>Because there are only a few truly original recipes, the secret is in research. Creating a recipe starts with having an idea.I draw inspiration from many sources, including seasonal ingredients, eating habits, food blogs, Facebook pages, cookbooks, and holidays.I start my research once I have an extensive understanding of the kind of recipe I want to produce.The next step is looking into the ingredients and preparation methods specific to the dish, the tools required, and the ideal flavor and texture combinations for a certain element.Experiment with flavors and ingredients you are already familiar with to come up with something unique. There is no right or wrong way to accomplish it — it all depends on your preferences and temperament.If you want to learn the basics of recipe development, read as many food-related books, articles, and magazines as you can. You can probably source a few publications from your local library. </h5>
                    <button onClick={()=>{console.log("Button Clicked");
                        navigate('/addRecipe');
                        }}>
                    Add Recipe</button>
                </div>
                <div className='right'>
                    <img src={food} width="320px" height="300px"></img>
                </div>
            </section>
            

            <div className='recipe'>
                <RecipeItems/>
            </div>
        </>
    )
}