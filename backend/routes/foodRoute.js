import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodcontroller.js"
import multer from "multer"

const foodRouter = express.Router()

// Upload storage config (simple version for now)
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("uploads"))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

// Routes
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list",listFood )
foodRouter.post("/remove",removeFood);
export default foodRouter