const express = require("express");
const cors=require("cors");
const path = require('path');
const app = express();

const { getList } = require("./controllers/getListController");
const { deleteItems } = require("./controllers/deleteController");
const {addItems} = require("./controllers/addController");
const {updateItem} = require("./controllers/UpdateController");


app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/package', function(req, res) {
  res.sendFile(path.join(__dirname, '../lotto_app/build', 'index.html'));
});

app.post("/getJoinedData", getList);
app.post("/deleteItems", deleteItems);
app.post("/addItem", addItems);
app.post("/updateTable", updateItem);

 app.listen(8080,()=>{
    console.log("running backend server")
})