import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(join(__dirname, "index.html"));
});

app.post("/check", (req, res)=>{
    var url = req.body.url;
    const qr_img = qr.image(url, {type: "png"});

    qr_img.pipe(fs.createWriteStream("public/qr.png"));
    fs.appendFile("URL.txt", url + "\n", (err)=>{
        if(err) throw err;
        console.log("The link has been saved.");
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});