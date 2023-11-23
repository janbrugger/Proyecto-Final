const fs = require("fs");
const path = require("path");

const getComments = (id) => {
const filePath = path.join(__dirname, '../json/emercado-api/products_comments/', `${id}.json`);


const data = fs.readFileSync(filePath, "utf-8");
const comments = JSON.parse(data);

  return comments;
};



module.exports = {

    getComments,

};
