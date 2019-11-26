const router = require('express').Router();
const pool = require('../modules/pool');

router.get(`/`, (req, res)=>{
    console.log('in / GET');
    let query = `SELECT * FROM listings;`;
    pool.query(query)
    .then(result=>{
        res.send(result);
    }).catch(error=>{
        console.log('ERROR GETTING LISTINGS ------------------------>', error);
        res.sendStatus(500);
    })
})



module.exports = router;