-- Insert authors
INSERT INTO authors (name) VALUES ('J.K. Rowling');

INSERT INTO authors (name) VALUES ('George Orwell');

INSERT INTO authors (name) VALUES ('Harper Lee');

INSERT INTO authors (name) VALUES ('J.R.R. Tolkien');

INSERT INTO authors (name) VALUES ('Jane Austen');

-- Insert books
INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780439554930, 'Harry Potter and the Sorcerer''s Stone', 1997, 1, 320, 'The first book in the Harry Potter series.', 4
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780439136365, 'Harry Potter and the Chamber of Secrets', 1998, 1, 352, 'The second book in the Harry Potter series.', 4
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780439358071, 'Harry Potter and the Prisoner of Azkaban', 1999, 1, 448, 'The third book in the Harry Potter series.', 4
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780141187761, '1984', 1949, 2, 328, 'A dystopian novel by George Orwell.', 5
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780061120084, 'To Kill a Mockingbird', 1960, 3, 281, 'A novel by Harper Lee.', 4
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780547928227, 'The Lord of the Rings', 1954, 4, 1178, 'A high fantasy epic by J.R.R. Tolkien.', 5
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780679783268, 'Pride and Prejudice', 1813, 5, 279, 'A romantic novel by Jane Austen.', 4
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780062315007, 'Harry Potter and the Goblet of Fire', 2000, 1, 734, 'The fourth book in the Harry Potter series.', 3
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780439139595, 'Harry Potter and the Order of the Phoenix', 2003, 1, 870, 'The fifth book in the Harry Potter series.', 2
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780439358064, 'Harry Potter and the Half-Blood Prince', 2005, 1, 652, 'The sixth book in the Harry Potter series.', 4
    );

INSERT INTO
    books (
        isbn, title, publication_year, author_id, pages, resume, score
    )
VALUES (
        9780545139700, 'Harry Potter and the Deathly Hallows', 2007, 1, 759, 'The seventh and final book in the Harry Potter series.', 4
    );