--All for that building
  sql = `SELECT tbl_contractors."idContractor", tbl_contractors."fullName", tbl_bookings."fromDate", tbl_bookings."toDate", 
         tbl_buildings."idBuildings", tbl_buildings."city", tbl_buildings."address"
         FROM tbl_contractors INNER JOIN tbl_bookings ON tbl_contractors."idContractor" = tbl_bookings."idContractor"
         INNER JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings" 
          WHERE tbl_buildings."idBuildings"=${idBuilding}`

--Ordered
  sql = `SELECT tbl_bookings."idBookings", tbl_contractors."idContractor", tbl_contractors."fullName", tbl_bookings."fromDate", tbl_bookings."toDate", 
         tbl_buildings."idBuildings", tbl_buildings."city", tbl_buildings."address"
         FROM tbl_contractors INNER JOIN tbl_bookings ON tbl_contractors."idContractor" = tbl_bookings."idContractor" 
         INNER JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
         WHERE 
         (tbl_bookings."fromDate"<'${fromDate}' AND tbl_bookings."toDate">'${toDate}') 
         OR (tbl_bookings."fromDate"<'${fromDate}' AND tbl_bookings."toDate">'${fromDate}') 
         OR (tbl_bookings."fromDate"<'${toDate}' AND tbl_bookings."toDate">'${toDate}') 
         OR (tbl_bookings."fromDate"='${fromDate}' AND tbl_bookings."toDate"='${toDate}') 
         OR ((tbl_bookings."fromDate">'${fromDate}' AND tbl_bookings."fromDate"<'${toDate}') AND tbl_bookings."toDate">'${toDate}') 
         ORDER BY tbl_bookings."idBookings", tbl_contractors."idContractor"`
 
--Available
  sql = `SELECT tbl_bookings."idBookings", tbl_contractors."idContractor", tbl_contractors."fullName", tbl_bookings."fromDate", tbl_bookings."toDate", 
         tbl_buildings."idBuildings", tbl_buildings."city", tbl_buildings."address"
         FROM tbl_contractors INNER JOIN tbl_bookings ON tbl_contractors."idContractor" = tbl_bookings."idContractor" 
         INNER JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
         WHERE (tbl_bookings."fromDate">='${fromDate}' AND tbl_bookings."fromDate">'${toDate}') 
         OR ((tbl_bookings."toDate"<'${fromDate}' OR tbl_bookings."toDate"='${fromDate}') AND tbl_bookings."toDate" <'${toDate}') 
          ORDER BY tbl_bookings."idBookings", tbl_contractors."idContractor"`
  
--Available distinct
  sql = `SELECT DISTINCT tbl_contractors."idContractor", tbl_contractors."fullName"
         FROM tbl_contractors INNER JOIN tbl_bookings ON tbl_contractors."idContractor" = tbl_bookings."idContractor" 
         INNER JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings" 
         WHERE (tbl_bookings."fromDate">='${fromDate}' AND tbl_bookings."fromDate">'${toDate}') 
         OR ((tbl_bookings."toDate"<'${fromDate}' OR tbl_bookings."toDate"='${fromDate}') AND tbl_bookings."toDate" <'${toDate}') 
         ORDER BY tbl_contractors."idContractor"`
