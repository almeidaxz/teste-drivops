CREATE TABLE dsdrivops;

CREATE TABLE IF NOT EXISTS managers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    manufacturer TEXT NOT NULL,
    name TEXT NOT NULL,
    year TEXT NOT NULL,
    car_value INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    inventory INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS salesmen (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    sale_value INTEGER NOT NULL,
    car_id INTEGER NOT NULL REFERENCES cars(id),
    salesman_id INTEGER NOT NULL REFERENCES salesmen(id),
    sell_date TIMESTAMPTZ NOT NULL,
    cars_amount INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);