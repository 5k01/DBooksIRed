import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

//  Consts - settings
const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// DB connection
const db = new pg.Client({
    host: "localhost",
    database: "dbooksired",
    user: "postgres",
    password: "alonso",
    port: 5432,
});

db.connect();

// HTTPs
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`App is runngin on http://localhost:${port}/`);
});