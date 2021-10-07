const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM "hazard" WHERE id = $1`;
  pool.query(query, [id])
    .then( result => {
      console.log('hazard by id is ', result.rows[0]);
      
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log('Get Job Details with ID failed', err);
      res.sendStatus(500)
    })
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const image = req.body.image;
  const userId = req.user.id;
  const approved = true;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  console.log('user id is ', userId);
  

  const queryText = `
    INSERT INTO "hazard" 
        (name, description, street, city, state, zip, image, user_id, approved, latitude, longitude)
    VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;
  pool
    .query(queryText, [name, description, street, city, state, zip, image, userId, approved, latitude, longitude])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Post hazard failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const image = req.body.image;
  const userId = req.user.id;
  const approved = true;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  console.log('user id is ', userId);

  const query = `
  UPDATE "hazard"
  SET 
    name = $1, 
    description = $2, 
    street = $3, 
    city = $4, 
    state = $5, 
    zip = $6, 
    image = $7, 
    user_id = $8, 
    approved = $9, 
    latitude = $10, 
    longitude = $11
  WHERE id = $12;
  `;
  pool.query(query, [name, description, street, city, state, zip, image, userId, approved, latitude, longitude, id])
    .then( result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('hazard PUT by id failed', err);
      res.sendStatus(500)
    })
});

module.exports = router;
