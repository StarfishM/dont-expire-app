DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL CHECK (name !=''),
    img_url VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_until_expiry INT NOT NULL,
    regular_item BOOLEAN DEFAULT FALSE
);


INSERT INTO items (name, img_url,time_until_expiry, regular_item) VALUES ('eggs', 'https://images.unsplash.com/photo-1477506410535-f12fe9af97cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80','14','true'),('milk','https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', '14','true'),
('mozzarella','https://images.unsplash.com/photo-1477921510058-85812315a3c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', '7','true'),('chicken raw','https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', '7','true'),('chocolate','https://images.unsplash.com/photo-1522249341405-3871994ac062?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80', '365','true'),('bread','https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80', '7','true'),('salami', 'https://images.unsplash.com/photo-1542901031-ec5eeb518e83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80','18','true');
