DROP TABLE IF EXISTS userpantry CASCADE;

CREATE TABLE userpantry(
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES items(id),
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date INT,
    amount INT,
    date_bought DATE NOT NULL DEFAULT CURRENT_DATE,
    expires_after_date_bought DATE,
    on_shopping_list BOOLEAN DEFAULT FALSE,
    used_up BOOLEAN DEFAULT FALSE
);
