import foodmodel from "../models/foodmodel.js"
import fs from 'fs'

// ADD FOOD ITEM
const addFood = async (req, res) => {
  try {
    const food = new foodmodel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file ? req.file.filename : ""
    })

    const savedFood = await food.save()
    res.json({ success: true, message: "Food Added", data: savedFood })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error adding food" })
  }
}

// all food liist
const listFood =  async (req,res) => {
    try{
        const foods = await foodmodel.find({});
        res.json({success:true,data:foods})
    }catch (error) {
        console.log(error);
     res.json({sucess:false,message:"Error"})
    }

}

// remove foo item
const removeFood = async (req, res) => {
  try {
    const food = await foodmodel.findById(req.body.id)
    fs.unlink(`uploads/${food.image}`, () => {})
    
    await foodmodel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Food Removed" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

export { addFood,listFood,removeFood }