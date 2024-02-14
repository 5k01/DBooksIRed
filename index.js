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
app.get("/", async (req, res) => {
    let books = []
    try {
        const result = await db.query("SELECT * FROM books b JOIN authors a ON  b.author_id=a.id ORDER BY id DESC");
        books = result.rows;
    } catch (error) {
        console.log(`Error al obtener los libros ${error}`);
    }
    console.log(books);
    res.render("index.ejs", {
        books: books || [],
    });
});

app.listen(port, () => {
    console.log(`App is runngin on http://localhost:${port}/`);
});