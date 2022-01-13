const express = require("express");
var ua = require("universal-analytics");
// var cors = require("cors");

const app = express();

// app.use(cors());
app.use(express.json());

app.post("/feedback", (req, res) => {
  const visitor = ua("UA-215309627-1");

  const body = req.body;

  // console.log("request", req);
  console.log("request body", body);

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  if (body === undefined) {
    res.status(400).json({ message: `Invalid Request ${req.body}` });
  } else {
    if (body.category === undefined) {
      res.status(400).json({ message: `Category Missing ${body}` });
    } else if (body.action === undefined) {
      res.status(400).json({ message: `Action Missing ${body}` });
    } else {
      const category = body.category;
      const action = body.action;

      console.log("category", category);
      console.log("action", action);

      visitor.event(category, action).send();
      res.json({ success: true, message: `Feedback Sent` });
    }
  }
});

module.exports = app;

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
