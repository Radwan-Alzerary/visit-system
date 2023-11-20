const router = require("express").Router();
const Visit = require("../models/visiter");

router.get("/", async (req, res) => {
  const visit = new Visit();
  await visit.save();
  res.json(visit);
});

router.post("/generate", async (req, res) => {
  const visit = new Visit();
  await visit.save();
  res.json(visit);
});
router.post("/reg/update", async (req, res) => {
  try {
    console.log(req.body)
    const visit = await Visit.findOne({_id: req.body.id });
    console.log(req.body.id)

    if (!visit) {
      return res.status(404).json({ error: "Visit not found" });
    }

    visit.name = req.body.name;
    visit.enterprise = req.body.enterprise;
    visit.email = req.body.email;
    visit.phoneNumber = req.body.phoneNumber;
    visit.registered = true;

    await visit.save();
    res.render("regesteryComplte");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/reg/:id", async (req, res) => {
  const visit = await Visit.findOne({ _id: req.params._id });
  if (visit) {
    if (visit.registered) {
      res.render("alredySubmint");
    } else {
      res.render("visitRegestery", { visit: visit });
    }
  } else {
    res.json({ error: "error" });
  }
});
module.exports = router;
