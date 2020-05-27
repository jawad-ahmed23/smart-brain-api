const clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "d1cb9fe7ca0d4a94b25426b349e86031",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("cannot connect to the API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json(err, "unable to increment entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
