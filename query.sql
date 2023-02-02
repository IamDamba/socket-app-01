create table users (
  id int generated always as identity primary key,
  email text,
  username text,
  pwd text
) create table conversations (
  id int generated always as identity primary key,
  fk_users_id_1 int references users (id) not null,
  fk_users_id_2 int references users (id) not null
) create table messages (
  id int generated always as identity primary key,
  fk_users_id int references users (id) not null,
  fk_conversations_id int references conversations (id) not null,
  msg text,
  created_at timestamp without time zone
) create table arrival_messages (
  id int generated always as identity primary key,
  fk_users_id int references users (id) not null,
  fk_conversations_id int references conversations (id) not null,
  msg text,
  created_at timestamp without time zone
)
insert into users (email, username, pwd)
values ('test1@test.email', 'testeur1', '123456'),
  ('test2@test.email', 'testeur2', '123456')