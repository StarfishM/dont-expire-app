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
('mozzarella','https://images.unsplash.com/photo-1477921510058-85812315a3c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', '7','true'),('chicken raw','https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', '7','true'),('chocolate','https://images.unsplash.com/photo-1522249341405-3871994ac062?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80', '365','true'),('bread','https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80', '7','true'),('salami', 'https://images.unsplash.com/photo-1542901031-ec5eeb518e83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80','18','true'),
('Olive Oil','https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=722&q=80','730','true'),
('Flour','https://images.unsplash.com/photo-1545587195-a625d872ca82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80','240','true'),
('Sugar','https://images.unsplash.com/photo-1553747069-aefa5a5c9bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80','720','true'),
('Tomato paste','https://cdn11.bigcommerce.com/s-p82jn6co/images/stencil/1280x1280/products/8342/7788/38077__81654.1528138299.jpg?c=2&imbypass=on','720','true'),
('Coconut Milk','https://cdn2.stylecraze.com/wp-content/uploads/2013/09/22-Significant-Benefits-Of-Coconut-Milk-Nariyal-Ka-Doodh-For-Health-Skin-And-Hair.jpg.webp','720','true'),
('Rice','https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80','365','true'),
('Pasta','https://images.unsplash.com/photo-1532939624-3af1308db9a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60','720','true'),
('Garlic','https://images.unsplash.com/photo-1501420193726-1f65acd36cda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80','96','true'),
('Potatoes','https://images.unsplash.com/photo-1533384159656-84b8ae5ce5e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80','35','true'),
('Carotts','https://images.unsplash.com/photo-1550081699-79c1c2e48a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80','28','true'),
('Peppers','https://images.unsplash.com/photo-1465362342881-f183990e82b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80','28','true'),
('Cucumber','https://images.unsplash.com/photo-1528498069114-c382c9c976a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80','7','true'),
('Lettuce','https://images.unsplash.com/photo-1506073881649-4e23be3e9ed0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80','7','true'),
('Apples','https://images.unsplash.com/photo-1477830530828-c849c4b9bf2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80','14','true'),
('Pears','https://images.unsplash.com/photo-1543363136-314062964bef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80','14','true'),
('Blueberries','https://images.unsplash.com/photo-1460400408855-36abd76648b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80','14','true'),
('Bananas','https://images.unsplash.com/photo-1558035579-a10d04acf787?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60','7','true'),
('Salt','https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80','1000','true'),
('Pepper','https://images.unsplash.com/photo-1517336239897-19751f967295?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1597&q=80','1000','true')
;
