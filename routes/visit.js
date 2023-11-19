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

router.get("/reg/:id", async (req, res) => {
  const visit = await Visit.findOne({ id: req.body.params.id });
  if (visit.registered) {
    res.render("alredySubmint");
  } else {
    res.render("visitRegestery",{visitId:visit});
  }
});
module.exports = router;
