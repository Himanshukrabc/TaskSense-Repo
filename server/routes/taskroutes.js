const router = require('express').Router();
const Task = require('../models/Task');

// create a task
router.post('/create',async (req,res)=>{
    try{
        const obj=req.body;
        console.log(obj);
        const newTask=new Task(obj);
        const savedTask = await newTask.save();
        res.status(200).send(savedTask);    
    } 
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

// update a Task
router.put('/get/:id',async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        // console.log(Task.userid,req.params.id);
        await task.updateOne({$set:req.body});
        res.status(200).send("Task Updated");    
    } 
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

// get a Task
router.get('/get/:id',async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        res.status(200).send(task);    
    } 
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

// delete a Task
router.delete('/get/:id',async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        // console.log(Task.userid,req.params.id);
        await task.deleteOne();
        res.status(200).send("Task Deleted");    
    } 
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

// get all pending tasks
router.get("/pending",async(req,res)=>{
    try{
        const tasks = await Task.find({status:false});
        tasks.sort((a,b)=>{
            if(a.end==b.end)return a.priority-b.priority;
            else return a.end-b.end;
        });
        res.status(200).send(tasks);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
}); 

// get all completed tasks
router.get("/completed",async(req,res)=>{
    try{
        const tasks = await Task.find({status:true});
        tasks.sort((a,b)=>{
            if(a.end==b.end)return a.priority-b.priority;
            else return a.end-b.end;
        });
        res.status(200).send(tasks);
    }
    catch(err){
        console.log(err);       
        res.status(403).send(err);
    }
}); 

// search Tasks
router.get("/search/:val",async(req,res)=>{
    try{
        const val=req.params.val;
        const Tasks = await Task.find({$or:[{ 'title': {$regex: ".*" + val + ".*", $options:'i'} },{ 'description': {$regex: ".*" + val + ".*", $options:'i'} }]});
        res.status(200).send(Tasks);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
}); 

module.exports = router;