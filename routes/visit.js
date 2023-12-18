const router = require("express").Router();
const Visit = require("../models/visiter");

router.get("/", async (req, res) => {
  const visit = new Visit();
  await visit.save();
  res.json(visit);
});

router.post("/generate", async (req, res) => {
  const visit = new Visit();
  if (req.body.indstrial) {
    visit.indstrial = req.body.indstrial;
  }
  await visit.save();
  res.json(visit);
});

router.post("/reg/update", async (req, res) => {
  try {
    console.log(req.body);
    const visit = await Visit.findById(req.body.id);
    console.log(req.body.id);

    if (!visit) {
      return res.status(404).json({ error: "Visit not found" });
    }

    visit.name = req.body.name;
    visit.enterprise = req.body.enterprise;
    visit.email = req.body.email;
    visit.CareerTitle = req.body.CareerTitle;
    visit.registeredDate = Date.now();
    visit.registered = true;
    await visit.save();
    res.render("regesteryComplte");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/new", async (req, res) => {
  try {
    console.log(req.body);
    const visit = new Visit({
      name: req.body.name,
      inviteFrom:req.body.inviteFrom,
      enterprise: req.body.enterprise,
      email: req.body.email,
      CareerTitle : req.body.CareerTitle,
      registeredDate: Date.now(),
      registered: true
    });

    await visit.save();
    res.render("regesteryComplte");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/new", async (req, res) => {
  res.render("newVisit");
});

router.get("/reg/:id", async (req, res) => {
  const visit = await Visit.findById(req.params.id);
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

router.get("/check", async (req, res) => {
  const visits = await Visit.find({ registered: true }).sort({
    enterprise: 1,
  });

  res.render("visitCheck", { visits });
});

router.post("/comingaccept", async (req, res) => {
  const visits = await Visit.findByIdAndUpdate(req.body.id, { coming: true , comingDate:Date.now() });
  res.json(visits);
});

router.get("/nameSearch/:name", async (req, res) => {
  const visits = await Visit.find({
    name: { $regex: req.params.name, $options: "i" },
  });

  res.json(visits);
});

router.get("/nameSearch/", async (req, res) => {
  const visits = await Visit.find();

  res.json(visits);
});

router.get("/check/:id", async (req, res) => {
  const visit = await Visit.findById(req.params.id);
  console.log(visit);
  if (visit) {
    if (visit.registered) {
      res.render("visitProfile", { visit });
    } else {
      await Visit.findByIdAndUpdate(req.params.id, { registered: true });
      res.render("visitRegestery", { visit: visit });
    }
  }else{
    res.json("error");

  }
});

module.exports = router;
