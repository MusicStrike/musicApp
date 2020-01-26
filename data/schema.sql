DROP TABLE IF EXISTS Songs;
CREATE TABLE Songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    preview_mp3 VARCHAR(255),
    artist VARCHAR(255),
    album_title VARCHAR(255),
    album_cover_image VARCHAR(255)
);