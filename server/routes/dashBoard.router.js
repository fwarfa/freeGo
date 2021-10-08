const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

/**
 * GET route template
 */
router.get("/", async (req, res) => {
try {
  //creating query
  const query = `
        SELECT 
            h.id, h.approved,h.name, h.city, h.state, h.street, h.zip, h.threat_level, h.latitude, h.longitude, h.image, genre.title, genre.description 
        FROM 
            "hazard" as h
        LEFT JOIN 
            "hazard_genre" as genre ON genre.id = h.genre_id;`;
  //Making pool request to to my local db 
  const dbData = await pool.query(query);
  //Making axios get request to open Minneapolis Api
  const openApiData = await axios.get(
    "https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where=1%3D1&outFields=publicaddress,reportedDate,beginDate,offense,description,UCRCode,centergbsid,centerLong,centerLat,centerX,centerY,neighborhood,lastchanged,LastUpdateDateETL&resultRecordCount=1&outSR=4326&f=json"
  );

  const dbRes = dbData.rows;
  const openDataApi = openApiData.data.features;

  console.log("db response is", dbRes);
  console.log("open Api data is", openDataApi);

  res.send(
    dbRes
    // openDataApi,
  );
} catch (error) {
  console.log("GET Minnespolis Open Api/db error is", error)
  
}
});
/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
