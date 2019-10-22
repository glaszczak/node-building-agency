const express = require('express')
const router = express.Router()
const contractor = require('../controllers/contractorsController')


// Index Page
router.get("/", async (req, res) => {
    const contractors = await contractor.getContractors()
    res.render("contractors/index", { contractors: contractors })
});

// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

// Process Form - add new
router.post("/", async (req, res) => {
    //console.log(req.body.fullName, req.body.city, req.body.address)
    await contractor.addNewContractor(req.body.fullName, req.body.city, req.body.address)
    res.redirect('/contractors')
})

// Edit Contractor Form
router.get("/edit/:id", async (req, res) => {
    const contractorDetails = await contractor.getContracorDetails(req.params.id)
    //console.log(contractorDetails[0])
    res.render("contractors/edit", { contractors: contractorDetails[0] })
})

// Process Form - edit existing
router.put("/edit/:id", async (req, res) => {
    await contractor.editContractor(req.params.id, req.body.fullName, req.body.city, req.body.address)
    res.redirect('/contractors')
})

// Delete Contractor
router.delete("/:id", async (req, res) => {
    await contractor.deleteContractor(req.params.id)
    res.redirect('/contractors')
})

module.exports = router