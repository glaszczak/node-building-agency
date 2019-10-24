# Building agency application (CRUD)

Application using Node.js, Express, PostgreSQL, view engine: handlebars

Application available on heroku: https://building-agency.herokuapp.com/

Buildings renovation agency application
Manager needs to book contractors for renovation work in given buildings.

Models:
  Contractor (basic personal info like full name or company details)
  Building (just address of the building)
  Booking (contractor, from/to dates)

Tasks:
  prepare models and corresponding database structure in migrations.
  identify and write the correct relations for those models
  make CRUD interface for Contractors, Buildings and Bookings, ensure that each list can be filtered
  for Booking: make sure that bookings are not overlapping i.e. one contractor cannot be booked for many buildings if date periods are      overlapping with each other
  on the main page of the application display the following stats:
  top 5 contractors with the greatest number of bookings,
  top 5 contractors with the greatest number of upcoming bookings (don't count any past bookings)
  top 5 buildings with upcoming bookings
