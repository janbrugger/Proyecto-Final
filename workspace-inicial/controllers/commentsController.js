const commentsModel = require("../models/commentsModel");


const getComments = (req, res) => {
  const comments = commentsModel.getComments(req.params.id);
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
};



module.exports = {

    getComments,

};