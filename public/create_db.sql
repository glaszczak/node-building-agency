-- FILL TABLES
INSERT INTO tbl_contractors("fullName", "city", "address")
VALUES
('Bechtel Group Inc.', 'San Francisco, California', 'SF Street 1'),
('Fluor Corporation', 'Irvine, California', 'LA Street 1'),
('Chicago Bridge & Iron Company', 'The Woodlands, Texas', 'NY Street 2'),
('Jacobs Engineering Group Inc.', 'Houston, Texas', 'LA Street 2'),
('Kiewit Corporation', 'Omaha, Nebraska', 'BST Street 1'),
('Turner Construction', 'New York City, New York', 'CHC Street 1'),
('Skanska Construction', 'New York City, New York', 'BST Street 2'),
('PCL Construction', 'Denver, Colorado', 'CHC Street 2'),
('Whiting-Turner Contracting Company', 'Baltimore, Maryland', 'MIM Street 1'),
('KBR (Kellogg, Brown, & Root) Inc.', 'Houston, Texas', 'ATL Street 1'),
('ACS Actividades de Construcción y Servicios S.A.', 'Madrid, Spain', 'NY Street 3'),
('Strabag', 'Vienna, Austria', 'CHC Street 3');

INSERT INTO tbl_buildings ("city", "address")
VALUES
('Boston', 'BST Street 10'),
('Miami', 'MIM Street 10'),
('New York', 'NY Street 10'),
('Chicago', 'CHC Street 10'),
('Boston', 'BST Street 11'),
('New York', 'NY Street 11'),
('Atlanta', 'ATL Street 10'),
('Miami', 'MIM Street 11'),
('Chicago', 'CHC Street 11'),
('New York', 'NY Street 12'),
('Los Angeles', 'LA Street 10'),
('Miami', 'MIM Street 12'),
('Los Angeles', 'LA Street 11'),
('Denver', 'DNV Street 11'),
('Denver', 'DNV Street 12');

INSERT INTO tbl_bookings ("fromDate", "toDate", "idContractor", "idBuilding")
VALUES
('2019-05-01', '2019-07-01', 2, 1),
('2019-07-02', '2019-10-01', 2, 2),
('2019-10-02', '2020-01-01', 2, 3),
('2019-01-01', '2019-01-31', 3, 4),
('2019-01-01', '2019-03-01', 4, 5),
('2019-05-01', '2019-07-01', 4, 6),
('2019-05-10', '2019-07-01', 5, 7),
('2019-03-01', '2019-07-01', 6, 8),
('2019-06-01', '2019-07-20', 7, 9),
('2019-02-01', '2019-04-01', 8, 10),
('2019-09-01', '2019-11-01', 9, 11),
('2019-09-01', '2019-11-01', 2, 12),
('2019-11-02', '2019-12-01', 2, 13),
('2019-10-02', '2020-01-01', 4, 14),
('2020-01-01', '2020-01-31', 5, 15),
('2020-01-01', '2020-03-01', 6, 5),
('2020-05-01', '2020-07-01', 10, 6),
('2020-05-10', '2020-07-01', 11, 7),
('2020-03-01', '2020-07-01', 5, 8),
('2020-06-01', '2020-07-20', 8, 9),
('2020-02-01', '2020-04-01', 13, 10),
('2020-09-01', '2020-11-01', 12, 11);
