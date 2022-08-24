const express= require('express');
const dotenv= require('dotenv');
const helmet= require('helmet');
const morgan= require('morgan'); 
const cors= require('cors'); 
const { default: mongoose } = require('mongoose'); 
const app=express();
const taskroutes= require('./routes/taskroutes');

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));

// Router for task queries
app.use("/api/tasks",taskroutes);

app.listen(process.env.PORT||8000,()=>{
    console.log("Backend Running");
});
