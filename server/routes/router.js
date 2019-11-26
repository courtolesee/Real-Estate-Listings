const router = require('express').Router();
const pool = require('../modules/pool');

router.delete(`/:id`, (req, res)=>{
    console.log('in /:id DELETE');
    let query = `DELETE FROM listings WHERE id = $1;`;
    pool.query(query, [req.params.id])
    .then(result=>{
        res.sendStatus(200);
    }).catch(error=>{
        console.log('ERROR DELETING A LISTING ------------------------>', error);
        res.sendStatus(500);
    })
})

router.get(`/`, (req, res)=>{
    console.log('in / GET');
    let query = `SELECT * FROM listings;`;
    pool.query(query)
    .then(result=>{
        res.send(result.rows);
    }).catch(error=>{
        console.log('ERROR GETTING LISTINGS ------------------------>', error);
        res.sendStatus(500);
    })
})

router.post(`/`, (req, res)=>{
    console.log('in / POST');
    let id = [req.body.cost, req.body.sqft, req.body.type, req.body.city, req.body.image_path];
    let query = `INSERT INTO listings (cost, sqft, type, city, image_path) VALUES($1, $2, $3, $4, $5);`;
    pool.query(query, id)
    .then(result=>{
        res.sendStatus(201);
    }).catch(error=>{
        console.log('ERROR POSTING A LISTING ------------------------>', error);
        res.sendStatus(500);
    })
})



module.exports = router;