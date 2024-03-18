import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cors from 'cors'
import Phone from "./models/Phone.js"
//configure env
dotenv.config();

//database config
connectDB();
//rest object
// import "./Data/Phones_data.js"
const app=express();

//middlewares 
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
//routes
app.use("/api/v1/auth",authRoutes);

app.get("/api/v1/phones", async (req, res) => {
  try {
    // Fetch phone data from the database (using your model or other method)
    // For example, if you have a Phone model:
    const phoneData = await Phone.find(); // Adjust based on your model and database structure

    res.json(phoneData);
  } catch (error) {
    console.error('Error fetching phone data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//rest api
app.get("/",function(request,response){
    response.send({
        meassage:"Welcome to our app"
    });
});
const PORT=process.env.PORT || 3001;
app.listen(PORT, function() {
    console.log("Server started on port 3001");
  });