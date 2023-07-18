const UserModel = require("../models/UserModel");

module.exports.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
};

module.exports.saveUser = (req, res) => {
  const { user } = req.body;

  UserModel.create({ user })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: `Something went wrong! ${err}` });
    });
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  UserModel.findByIdAndUpdate(id, { user })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
