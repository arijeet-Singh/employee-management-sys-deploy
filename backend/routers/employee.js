const router = require("express").Router();
const Employee = require("../models/Employee");

router.put("/registration/:id", async (req, res) => {
  try {
    let employee;
    try {
      employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
    } catch (err) {
      console.log(err);
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET EMPLOYEE BY EMPLOYEEID
router.get("/search/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeID: req.params.id });
    res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/search/name/:name", async (req, res) => {
  try {
    const employee = await Employee.find({ name: req.params.name });
    res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/search/email/:email", async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.params.email });
    res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/search/aadhaar/:aadhaar", async (req, res) => {
  try {
    const employee = await Employee.findOne({ aadhaar: req.params.aadhaar });
    res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/search/phone/:phone", async (req, res) => {
  try {
    const employee = await Employee.findOne({ phoneNumber: req.params.phone });
    res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/search/job/:job", async (req, res) => {
  try {
    const employee = await Employee.find({ jobTitle: req.params.job });
    res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
