DROP TABLE IF EXISTS Songs;
CREATE TABLE Songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    preview_mp3 VARCHAR(255),
    artist VARCHAR(255),
    album_title VARCHAR(255),
    album_cover_image VARCHAR(255)
);
--  INSERT INTO Songs
--     (title, preview_mp3, artist, album_title, album_cover_image)
-- VALUES
--     (
--         'نسينى الدنيا - راغب علامة',
--         'https://cdns-preview-7.dzcdn.net/stream/c-7bfa94fb0d7b0f798f394808fdea5905-4.mp3',
--         'Ragheb Alama',
--         'Yabint El Sultan',
--         'https://e-cdns-images.dzcdn.net/images/cover/7b14cfe04ab1953be595761789b0ba03/250x250-000000-80-0-0.jpg'
-- );
--  INSERT INTO Songs
--     (title, preview_mp3, artist, album_title, album_cover_image)
-- VALUES
--     (
--         'نسينى الدنيا - راغب علامة',
--         'https://cdns-preview-7.dzcdn.net/stream/c-7bfa94fb0d7b0f798f394808fdea5905-4.mp3',
--         'Ragheb Alama',
--         'Yabint El Sultan',
--         'https://e-cdns-images.dzcdn.net/images/cover/7b14cfe04ab1953be595761789b0ba03/250x250-000000-80-0-0.jpg'
-- );
--  INSERT INTO Songs
--     (title, preview_mp3, artist, album_title, album_cover_image)
-- VALUES
--     (
--         'test2',
--         'https://cdns-preview-7.dzcdn.net/stream/c-7bfa94fb0d7b0f798f394808fdea5905-4.mp3',
--         'Ragheb Alama',
--         'Yabint El Sultan',
--         'https://e-cdns-images.dzcdn.net/images/cover/7b14cfe04ab1953be595761789b0ba03/250x250-000000-80-0-0.jpg'
-- );