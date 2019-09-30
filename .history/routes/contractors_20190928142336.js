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

// Process Form - add new
router.post("/", async (req, res) => {
    //console.log(req.body.fullName, req.body.city, req.body.address)
    await db.addNewContractor(req.body.fullName, req.body.city, req.body.address)
    res.redirect('/contractors')
})

// Edit Contractor Form
router.get("/edit/:id", async (req, res) => {
    const contractorDetails = await db.getContracorDetails(req.params.id)
    //console.log(contractorDetails[0])
    res.render("contractors/edit", { contractors: contractorDetails[0] })
})

// Process Form - edit existing
router.post("/:id", async (req, res) => {
    console.log(req.body.idContractor)
    console.log(req.body.fullName)
    //await db.editContractor(req.body.idContractor, req.body.fullName, req.body.city, req.body.address)
    res.redirect('/contractors')
})

module.exports = router