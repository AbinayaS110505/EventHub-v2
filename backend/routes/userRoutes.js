const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/all', async (req, res) => {
    try {
        const fetchedUsers = await User.find();
        res.status(200).json(fetchedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

router.get("/user/:id",async(req,res)=>{

    try{
        const {id}=req.params;
        const users=await User.findById(id);
        if(!users)
        {
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(users);
    }
    catch(err)
    {
        res.status(500).json({error:err.message})
    }

})

router.post('/add', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const UserRec = await User.findOne({ _id: id });

        if (!UserRec) {
            return res.status(404).json({ message: "User not found!" });
        }

        const newUserRec = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(newUserRec);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const currentRecord = await User.findOne({ _id: id });

        if (!currentRecord) {
            return res.status(404).json({ message: "User not found!" });
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "User Deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


module.exports = router;
