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
        const result = await db.query("SELECT b.isbn, b.title, b.publication_year, b.pages, b.resume, b.score, a.name AS author_name, COUNT(c.id) AS comments FROM books b JOIN authors a ON b.author_id = a.id LEFT JOIN comments c ON b.isbn = c.book_id GROUP BY b.isbn, b.title, b.publication_year, b.pages, b.resume, b.score, a.name ORDER BY b.publication_year ASC; ");
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

function getStarRating(score) {
    const maxStars = 10;
    const filledStars = Math.round((score / 10) * maxStars);
    const emptyStars = maxStars - filledStars;
    const starHTML = '<span class="star">&#9733;</span>'; // Unicode for star symbol
    const emptyStarHTML = '<span class="star">&#9734;</span>'; // Unicode for empty star symbol
    return starHTML.repeat(filledStars) + emptyStarHTML.repeat(emptyStars);
}

app.locals.getStarRating = getStarRating;