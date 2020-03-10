CREATE DATABASE holdmyliquor;
CREATE TABLE user
(
  id SERIAL PRIMARY KEY,
  first_name character varying,
  last_name character varying,
  user_name character varying,
  password character varying
);
CREATE TABLE favorite
(
  id integer DEFAULT nextval(‘untitled_table_id_seq’
  ::regclass) PRIMARY KEY,
  user_id integer NOT NULL REFERENCES user
  (id),
  drink_id integer
);
  CREATE TABLE review
  (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES user(id) REFERENCES favorite(id),
    rating integer,
    title text,
    review text,
    drink_id integer
  );