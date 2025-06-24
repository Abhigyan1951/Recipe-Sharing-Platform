const Recipes=require("../models/recipe")
const multer = require('multer')

const data=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './images')
    },
    filename: function(req,file,cb){
        const a= Date.now() + '-' + file.originalname
        cb(null, a)
    }
})
    const img=multer({storage: data})

const getRecipes=async(req,res)=>{
    try{
        const recipes=await Recipes.find()
        return res.json(recipes);
    }catch (err){
        return res.status(500).json({message:"Error fetching recipes"});
    }
}
const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (err) {
        return res.status(500).json({ message: "Invalid recipe ID" });
    }
};

const addRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body
    const image=req.file?.filename;
    console.log("Uploaded Image:",image);
    if(!title || !ingredients || !instructions){
        return res.status(400).json({message:"Fields cannot be empty"})
    }

    const newRecipe=await Recipes.create({
        title,ingredients,instructions,time,image
    })
    return res.json(newRecipe)
}
const editRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body
    try{
        let recipe=await Recipes.findById(req.params.id)
        if(recipe){
            let coverImage=req.file?.filename?req.file?.filename: recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({title,ingredients,instructions,time})
        }else{
            res.status(404).json({message:"Recipe not found"});
        }
    }
    catch(err){
        return res.status(404).json({message:"Invalid Recipe ID"});
    }
};
const deleteRecipe = async (req, res) => {
    try {
        const deleted = await Recipes.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting recipe" });
    }
};

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,img}