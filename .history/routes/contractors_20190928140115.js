const express = require('express')
const router = express.Router()
const db = require('../controllers/dbController')

// Index Page
router.get("/", async (req, res) => {
    const contractors = await db.getContractors()
    res.render("contractors/index", { contractors: contractors })
});

// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

// Process Form
router.post("/", async (req, res) => {
    //console.log(req.body.fullName, req.body.city, req.body.address)
    await db.addNewContractor(req.body.fullName, req.body.city, req.body.address)
    res.redirect('/contractors')
})

// Edit Contractor Form
router.post("/edit/:id", async (req, res) => {
    const contractorDetails = await db.getContracorDetails(req.params.id)
    //console.log(contractorDetails)
    res.render("contractors/edit", { contractor: contractorDetails })
})

module.exports = router