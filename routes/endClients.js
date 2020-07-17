const express = require("express");
const app = express();
// const _ = require("lodash");

const { Client } = require("../models/endClient");
const upload = require("../middleware/upload");
const excelToJson = require("convert-excel-to-json");
const ImportExceltoMDB = require("../middleware/importtoDB");
// const mdb = require("../middleware/importtoDB");
global.__basedir = __dirname;

app.post(
  "/clients",
  upload.single("img"),

  async (req, res) => {
    const img = req.file;
    console.log("img ", img);
    console.log("file name", __basedir + "/uploads/" + req.file.filename);

    const data = ImportExceltoMDB(__basedir + "/uploads/" + req.file.filename);
    // console.log(__basedir);

    console.log("samle data", data);

    console.log(
      data.map((d) => ((db = new Client(d)), console.log(db), db.save()))
    );

    // exlData.Sheet1.map((t) => ((p = new Client(t)), p.save()));

    // const client = new Client({
    //   code: req.body.code,
    //   mobileNumber: req.body.mobileNumber,
    // });

    // await client.save();
    // res.send(client);
  }
);

// function ImportExceltoMDB(filePath) {
//   // -> Read Excel File to Json Data
//   const exlData = excelToJson({
//     sourceFile: filePath,
//     sheets: [
//       {
//         // Excel Sheet Name
//         name: "Sheet1",
//         // Header Row -> be skipped and will not be present at our result object.
//         header: {
//           rows: 1,
//         },
//         // Mapping columns to keys
//         columnToKey: {
//           A: "code",
//           B: "mobileNumber",
//         },
//       },
//     ],
//   });

//   // console.log((s = exlData.Sheet1[0]));
//   exlData.Sheet1.map((t) => ((p = new Client(t)), p.save()));

//   // const client = new Client(s);
//   // s.save();
// }

app.get("/clients", async (req, res) => {
  const client = await Client.find();

  res.send(client);
});

module.exports = app;
