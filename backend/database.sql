CREATE DATABASE wemeet;

CREATE TABLE Customer(
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    user_password VARCHAR,
    user_email VARCHAR
)

CREATE TABLE Loan(
    id VARCHAR PRIMARY KEY,
    term_duration BIGINT,
    term_paid INT,
    loan_amount BIGINT,
    paid_amount BIGINT,
    customer_id VARCHAR,
    loan_status VARCHAR,
    loan_paid BOOLEAN,
    approved_date VARCHAR
)

CREATE TABLE Admin(
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    admin_email VARCHAR,
    admin_password VARCHAR
)