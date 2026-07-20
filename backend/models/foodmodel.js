import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
})

const Food = mongoose.model("Food", foodSchema)
export default Food