-- sqlite 3.17.0
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS user (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  hash          TEXT NOT NULL,
  active        BOOLEAN NOT NULL DEFAULT 1,
  stripe_id     VARCHAR(32),
  created       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_email ON user(email);


CREATE TABLE IF NOT EXISTS task (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name    VARCHAR(255) NOT NULL,
  done    TIMESTAMP,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY(user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS tag (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS task_need (
  task_id  INTEGER,
  need_id  INTEGER,

  FOREIGN KEY(task_id) REFERENCES task(id),
  FOREIGN KEY(need_id) REFERENCES task(id)
);

CREATE TABLE IF NOT EXISTS task_tag (
  task_id INTEGER,
  tag_id  INTEGER,

  FOREIGN KEY(task_id) REFERENCES task(id),
  FOREIGN KEY(tag_id) REFERENCES tag(id)
);

-- i dare you to decode the hash(s)
INSERT INTO user (name, email, hash)
VALUES
('goku', 'ss@dbz.io', 'a2FtZWhhbWVoYSE='),
('allmight', '*41@myhero.io', 'ZGVsYXdhcmUgc21hc2gh'),
('red', 'mew@pkmn.io', 'Y2hhcml6YXJkIGlzIHN0aWxsIHRoZSBiZXN0IHBva2Vtb24=');

INSERT INTO task (user_id, name)
VALUES
(2, 'Go to the bank'),
(2, 'Buy hammer'),
(2, 'Buy wood'),
(2, 'Buy nails'),
(2, 'Buy paint'),
(2, 'Hammer nails into wood'),
(2, 'Paint wings'),
(2, 'Have a snack');

INSERT INTO tag (name) VALUES ('Purchases'), ('Build Airplane');

INSERT INTO task_tag (task_id, tag_id)
VALUES
(1, 1),(2, 1),(3, 1),(4, 1),(5, 1),
(6, 2),(7, 2),(8, 2);

INSERT INTO task_need (task_id, need_id)
VALUES
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 2), (6, 3), (6, 4),
(7, 5), (7, 6);

-- mini report
select '-----';
select * from user where id = 2;
select '-----';

select
  t.id,
  g.name,
  t.name,
  'needs ' || n.need_id as needs
from task t 
  join task_tag g_map 
  on t.id = g_map.task_id
  join tag g
  on g_map.tag_id = g.id
  left join task_need n
  on t.id = n.task_id
where user_id = 2
order by t.id asc, n.need_id asc;

COMMIT;



-- Although this could just be a simple flat table to get going, 
-- I figured a little flexibility would give us multiple tags
-- (because my task groupings in real life often overlap categories).
-- Here is a flat table that I don't wanna build, 
-- it can be more performant though if you had like 300 columns
-- CREATE TABLE IF NOT EXISTS task_flat (
--   id      INTEGER PRIMARY KEY AUTOINCREMENT,
--   user_id INTEGER NOT NULL,
--   name    VARCHAR(255) NOT NULL,
--   tag     VARCHAR(255) NULL,
--   needs   TEXT NULL, -- has to be parsed because its just a serialized int array
--   created DATETIME NULL,
--   done    DATETIME NULL,
--   FOREIGN KEY(user_id) REFERENCES user(id)
-- );