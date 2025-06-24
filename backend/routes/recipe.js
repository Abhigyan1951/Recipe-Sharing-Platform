const express=require("express")
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,img } = require("../controller/recipe")
const router =express.Router()
router.get("/",getRecipes)
router.get("/:id",getRecipe)
router.post("/",img.single('file'),addRecipe)
router.put("/:id",img.single('file'),editRecipe)
router.delete("/:id",deleteRecipe)

module.exports=router;