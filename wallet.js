// import express from "express";
// const router = express.Router();

// let wallet = 0;

// router.get("/", (req, res) => {
//   res.json({ wallet });
// });

// router.post("/add", (req, res) => {
//   const { points } = req.body;
//   if (typeof points === "number" && points < 50) {
//     wallet += points;
//     return res.json({ wallet });
//   }
//   res.status(400).json({ error: "Invalid points" });
// });

// export default router;


import express from "express";
const router = express.Router();

let wallet = 0;

// Get wallet value
router.get("/", (req, res) => {
  res.json({ wallet });
});

// Add points to wallet (if less than 50)
router.post("/add", (req, res) => {
  const { points } = req.body;

  // Validate input: number, non-negative, less than 50
  if (typeof points !== "number" || points < 0 || points >= 50) {
    return res.status(400).json({ error: "Points must be a number between 0 and 49" });
  }

  wallet += points;
  res.json({ wallet });
});

export default router;
