const express = require("express");
const router = express.Router();
const Candidate = require("../models/Condidate");
const User = require('../models/User');
const { jwtAuthMiddleware } = require("../jwt");

//Function to check the user had Admin role
const checkAdminRole = async (userId) => {
  try {
    let user = await User.findById(userId);
    if (user.role === "admin"){
        return true
    };
  } catch (error) {
    return false;
  }
};

//POST route too Add Candidate
router.post("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);
    if(!isAdmin){
        res.status(403).json({
            Error:'Only Admin can add Candidates'
        })
    }else{
        const data = req.body;
    //Creating New Candidate using DB model
    let newCandidate = new Candidate(data);

    const response = await newCandidate.save();
    console.log("Data Saved", response);

    res.status(200).json({
      response: response,
    });
    }
    
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});


//PUT Route to Update Candidate
router.put("/:candidateId",jwtAuthMiddleware, async (req, res) => {
    try {
        const isAdmin = await checkAdminRole(req.user.id);

        if(!isAdmin){
            res.status(403).json({
                Error:'Only Admin can update Candidates'
            })
        }
        const userID = req.params.candidateId;
        const updatedData = req.body;

        const response = await Candidate.findByIdAndUpdate(userID,updatedData,{

            new:true,// Return Updated Data
            runValidators:true //Run Mongoose Validation
        });

        if(!response){
            res.status(404).json({
                Error:'No Candidate found to Update'
            })
        }else{
            console.log("Data Updated");
            res.status(200).json(response);
        }
        
    } catch (error) {
        res.status(500).json({
            Error:'Internal Server Error'
        })
        
    }
});

//DELETE Route to Delete Candidate
router.delete("/:candidateId",jwtAuthMiddleware, async (req, res) => {
    try {
        const isAdmin = await checkAdminRole(req.user.id);

        if(!isAdmin){
            return res.status(403).json({
                Error:'Only Admin can delete Candidates'
            })
        }
        const userID = req.params.candidateId;

        const response = await Candidate.findByIdAndDelete(userID);

        if(!response){
            res.status(404).json({
                Error:'No Candidate found to Delete'
            })
        }

        console.log("Data Deleted");
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({
            Error:'Internal Server Error'
        })
        
    }
});

//Voting Starts Here
// POST Route to Vote
router.post('/vote/:candidateId',jwtAuthMiddleware,async (req,res)=>{
    try {
        candidateId = req.params.candidateId;
        userId = req.user.id;

        const candidate = await Candidate.findById(candidateId);
        if(!candidate){
           return res.status(404).json({
                Message:"No candidate Found"
            })
        };
        const user = await User.findById(userId);
        if(!user){
           return res.status(404).json({
                Message:"No User Found"
            })
        }
        if(user.isVoted){
            return res.status(404).json({
                Message:"You have already voted"
            })
        }
        if(user.role === 'admin'){
            return res.status(404).json({
                Message:"Admin is not allowed to vote"
            })
        }

        //Update the Candidate Document
        candidate.votes.push({user:userId});
        candidate.voteCount++;
        await candidate.save();

        //Update the User Document
        user.isVoted = true;
        await user.save();

        return res.status(200).json({
            Message:"Vote recorded Successfully!!!"
        })
        
        
    } catch (error) {
        return res.status(500).json({
            Error:'Internal Server Error'
        })
        
    }
});

//GET Route for Vote Counte
router.get('/vote/count',async (req,res)=>{
    try {
        //Find all Candidates and sort in descending order based on vote count
        const candidates = await Candidate.find().sort({voteCount:'desc'});

        //Map the candidates and return only name and vote count
        const record = candidates.map((data)=>{
            return {
                party: data.party,
                votes : data.voteCount
            }
        });

        res.status(200).json(record);
        }

     catch (error) {
        res.status(500).json({
            Error:'Internal Server Error'
        })
    }
})

//GET Route to get List of candidate
router.get('/list',jwtAuthMiddleware,async (req,res)=>{
    try {
        const list = await Candidate.find();
        const record = list.map((data)=>{
            return {
                id:data._id,
                name:data.name,
                party:data.party,
                age:data.age
            }
        })
        res.status(200).json(record);

    } catch (error) {
        res.status(500).json({
            Error:'Internal Server Error'
        })
    }
})

//GET Route to get detls of Single Cadidate
router.get('/:candidateId',jwtAuthMiddleware,async (req,res)=>{
    try {
        const candidateId = req.params.candidateId;
        const candidate = await Candidate.findById(candidateId);
        if(!candidate){
            return res.status(404).json({
                Error:"Candidate Not Found"
            })
        }
         res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({
            Error:'Internal Server Error'
        })
    }
})

module.exports = router;
