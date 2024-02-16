CREATE TABLE authors (
    id SERIAL PRIMARY KEY, name VARCHAR(100)
);

CREATE TABLE books (
    isbn BIGINT UNIQUE NOT NULL, -- ISBN-13 number.
    title VARCHAR(255), -- Book's title.
    publication_year INTEGER CHECK (publication_year >= 0), -- Publication year.
    pages INT NOT NULL,
    resume TEXT,
    score INT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER REFERENCES authors (id) -- Author of the book.
    ON DELETE CASCADE -- If an author gets deleted, remove all their books too.
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    date DATE,
    book_id INTEGER REFERENCES books(isbn) ON DELETE CASCADE
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY, name VARCHAR(100)
);

CREATE TABLE book_genres(
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(isbn) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id)
);
