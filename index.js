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
        const result = await db.query("SELECT b.isbn, b.title, b.publication_year, b.pages, b.resume, b.score, a.name AS author_name, COUNT(c.id) AS comments FROM books b JOIN authors a ON b.author_id = a.id LEFT JOIN comments c ON b.isbn = c.book_id GROUP BY b.isbn, b.title, b.publication_year, b.pages, b.resume, b.score, a.name, b.date ORDER BY b.date DESC; ");
        books = result.rows;
    } catch (error) {
        console.log(`Error al obtener los libros ${error}`);
    }
    res.render("index.ejs", {
        books: books || [],
    });
});

app.get("/books/delete/:isbn", async (req, res) => {
    const isbn = parseInt(req.params.isbn);
    await db.query('DELETE FROM books WHERE ISBN=$1', [isbn]);
    res.redirect("/");
});

app.get("/comment/:isbn", async (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const result = await db.query("SELECT * FROM books b JOIN authors a ON b.author_id = a.id WHERE b.isbn = $1", [isbn]);
    const book = result.rows[0];

    const result2 = await db.query("SELECT  * FROM comments WHERE book_id= $1 ORDER BY date DESC", [isbn])
    const comments = result2.rows;

    res.render("comment.ejs", {
        book: book,
        comments: comments || []
    })
});

app.get("/new_book", (req, res) => {
    res.render("new_book.ejs");
});

app.post("/addbook", async (req, res) => {
    const author = req.body.author;
    let author_id = 0;

    const title = req.body.title;
    const isbn = req.body.isbn;
    const year = req.body.year;
    const score = req.body.score;
    const pages = req.body.pages;
    const resume = req.body.resume;
    try {
        // Verify if the authors name already exist in BD
        const existingAuthor = await db.query('SELECT * FROM authors WHERE lower(name)=$1', [author.toLowerCase()]);
        if (existingAuthor.rowCount > 0) {
            author_id = existingAuthor.rows[0].id;
        } else {
            await db.query("INSERT INTO authors(name) VALUES ($1)", [author]);
            existingAuthor = await db.query('SELECT * FROM authors WHERE lower(name)=$1', [author.toLowerCase()]);
            author_id = existingAuthor.rows[0].id;
        }

        await db.query("INSERT INTO books(isbn, title, publication_year, pages, resume, score, author_id) VALUES($1, $2, $3, $4, $5, $6, $7)", [
            isbn, title, year, pages, resume, score, author_id
        ]);

    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
    res.redirect("/");
});

app.post("/addcomment/:isbn", async (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const text = req.body.text;
    console.log(text);
    await db.query('INSERT INTO comments(text, book_id) VALUES($1, $2)', [text, isbn]);
    res.redirect("/comment/" + isbn);
});

app.listen(port, () => {
    console.log(`App is runngin on http://localhost:${port}/`);
});

function getStarRating(score) {
    const maxStars = 5;
    const filledStars = Math.round((score / 5) * maxStars);
    const emptyStars = maxStars - filledStars;
    const starHTML = '<span class="star">&#9733;</span>'; // Unicode for star symbol
    const emptyStarHTML = '<span class="star">&#9734;</span>'; // Unicode for empty star symbol
    return starHTML.repeat(filledStars) + emptyStarHTML.repeat(emptyStars);
}

app.locals.getStarRating = getStarRating;