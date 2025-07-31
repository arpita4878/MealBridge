import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

//to link router
import UserRouter from './routes/user.router.js';
import FoodRouter from './routes/donor.router.js';
import VolunteerRouter from './routes/Volunteer.router.js'
import PartnerRouter from './routes/partner.router.js'

//configuration to fetch req.body content :  body-parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//configuration to solve cross-origin problem
app.use(cors({
  origin: 'https://meal-bridge-vert.vercel.app',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["content-type", "Authorization"]
}));

//to link router use router level middleware
app.use("/user", UserRouter);
app.use("/food", FoodRouter);
app.use("/volunteer",VolunteerRouter);
app.use("/partner",PartnerRouter);

// Use PORT from env or fallback
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server invoked at port ${PORT}`);
});
