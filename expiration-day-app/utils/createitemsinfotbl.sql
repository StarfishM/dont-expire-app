DROP TABLE IF EXISTS userpantry CASCADE;

CREATE TABLE userpantry(
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES items(id),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date INT NOT NULL,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    on_shopping_list BOOLEAN DEFAULT FALSE
);