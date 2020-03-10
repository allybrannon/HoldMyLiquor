CREATE DATABASE holdmyliquor;


CREATE TABLE review
(
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES profile(id) REFERENCES favorite(id),
    rating integer,
    title text,
    review text,
    drink_id integer
);

CREATE TABLE favorite
(
    id Serial PRIMARY KEY,
    profile_id integer NOT NULL REFERENCES profile(id),
    drink_id integer
);

CREATE TABLE profile
(
    id serial PRIMARY KEY,
    first_name text,
    last_name text,
    user_name text,
    password text
);