-- Insert sample listings (flowers)
INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(1, 'Red Rose Bouquet', 'A classic bouquet of fresh red roses symbolizing love and passion', 39.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(2, 'Sunflower Stems', 'Bright and cheerful sunflowers ideal for summer arrangements', 24.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(3, 'Orchid Plant', 'Elegant phalaenopsis orchid in a ceramic pot; long-lasting blooms', 59.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(4, 'Tulip Assortment', 'Mixed-color tulip bundle sourced from premium Dutch growers', 29.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(5, 'Lavender Bunch', 'Fragrant dried lavender perfect for decor or aromatherapy', 14.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(6, 'Peony Bouquet', 'Lush seasonal peonies available in pink, coral, or white', 49.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(7, 'Daisy Arrangement', 'Simple and cheerful white daisies arranged with greenery', 19.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(8, 'Hydrangea Bundle', 'Large, vibrant hydrangea blooms in blue or white', 34.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(9, 'Carnation Mix', 'Colorful assortment of long-lasting carnations', 17.99);

INSERT INTO LISTING (ID, NAME, DESCRIPTION, PRICE) VALUES 
(10, 'Orchid Rose Hybrid Box', 'A luxury boxed flower arrangement combining roses and mini orchids', 89.99);

ALTER TABLE LISTING ALTER COLUMN ID RESTART WITH 11;