-- Insert sample listings
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (1, 'Apple iPhone 15', 'Latest Apple smartphone with 128GB storage', 999.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (2, 'Samsung Galaxy S23', 'High-end Android smartphone', 899.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (3, 'Sony WH-1000XM5', 'Noise-cancelling over-ear headphones', 399.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (4, 'Dell XPS 13', 'Compact high-performance laptop', 1199.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (5, 'Amazon Echo Dot', 'Smart speaker with Alexa', 49.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (6, 'Nintendo Switch', 'Hybrid gaming console', 299.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (7, 'Fitbit Charge 6', 'Fitness tracker with heart rate monitor', 149.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (8, 'Canon EOS R6', 'Professional mirrorless camera', 2499.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (9, 'Logitech MX Master 3', 'Advanced wireless mouse', 99.99);
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES (10, 'Kindle Paperwhite', 'E-reader with built-in light', 129.99);

ALTER TABLE LISTING ALTER COLUMN ID RESTART WITH 11;