const express = require('express')
const router = new express.Router()
const Donor = require('../models/donors.js')

router.post('/addDonor', async(req,res)=>{
    try{
        const donorId = await Donor.find().sort({id:-1}).limit(1)
        if(!donorId || donorId.length === 0) {
            id = 1
        }
        else{
            id = donorId[0].id + 1
        }

        const donor = new Donor({
            id:id,...req.body
        })
        
        await donor.save()
        res.send(`Donor ${donor.name} added successfully`)
    }
    catch(e){
        res.status(401).send(e)
    }

})


// router.get('/getDonors', async(req,res)=>{
//     try{
//         const donors = await Donor.find()
//         res.status(200).send(donors)
//     }
//     catch(e){
//         res.status(401).send(e)
//     }
// })


router.get('/getDonors', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit =5;
    const skip = (page - 1) * limit;
  
    try {
      const totalDonors = await Donor.countDocuments();
      const donors = await Donor.find().skip(skip).limit(limit);
  
      const donor = {
        donors, 
        currentPage: page,
        totalPages: Math.ceil(totalDonors / limit),
      }
      res.send(donor)

    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/filterSearch/:searchTerm', async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit =5;
    const skip = (page - 1) * limit;
    
    const query = req.params.searchTerm

    let searchIdquery = ''
    if(+query){
        this.searchIdquery = +query
    }
    const searchQuery = {
        $or: [
            { id: { $eq: this.searchIdquery} },
            { name: { $regex: query, $options:'i' } },
            { blood_group: { $regex: query, $options:'i' } },
            { address: { $regex: query, $options:'i' } },
            { contact: { $regex: query, $options:'i' } },
            { last_donated: { $regex: query, $options:'i' } },
        ],
    }
    
    try {
        const donors = await Donor.find(searchQuery).skip(skip).limit(limit);

        const donor = {
            donors, 
            currentPage: page,
            totalPages: Math.ceil(donors.length / limit)+1,
        }


        res.send(donor);
    }
    catch(e) {
        res.status(401).send(e)
    }
})

router.delete('/removeDonor/:id', async(req,res)=>{
    try{
        const removedDonor = await Donor.findOneAndDelete({id:req.params.id})
        res.status(200).send(`donor with id ${req.params.id} is removed successfully`)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.patch('/updateDonor', async(req,res)=>{
    const {id, address, contact} = {...req.body}
    const d = new Date()
    const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    try{
        await Donor.findOneAndUpdate({id},{address, contact, last_donated})
        res.status(200).send("donor details has been updated successfully")
    }
    catch(e){
        res.status(401).send(e)
    }
})



module.exports = router