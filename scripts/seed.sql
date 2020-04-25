BEGIN;
ALTER SEQUENCE blogposts_id_seq RESTART; 
--this resets primary key to 1
INSERT INTO blogposts
    (url)
VALUES
    (''),
    (''),
    (''),
    (''),
    (''),
    (''),
    (''),
    ('');


INSERT INTO articles
    (nameText, content, url, blogpostsId)
VALUES
    (),
    (),
    (),
    (),
    (),
    (),
    (),
    (),
    ();

COMMIT;