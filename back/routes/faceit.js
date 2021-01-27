'use strict';
const router = require("express").Router();
const fetch = require("node-fetch");
const cst = require("../config.json");

router.get("/standing/:id", async function(req, res) {

    const response = await fetch(`https://open.faceit.com/data/v4/leaderboards/championships/${req.params.id}/groups/1?offset=0&limit=32`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${cst.FACEIT_API_KEY}`
        }
    });

    if (!response.ok) {
        res.send(response);
    }

    const data = await response.json();

    res.send({
        ok: true,
        data: data
    });
});

router.get("/bracket/:id", async function(req, res) {

    const response = await fetch(`https://open.faceit.com/data/v4/championships/${req.params.id}/matches?offset=0&limit=32`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${cst.FACEIT_API_KEY}`
        }
    });

    if (!response.ok) res.send(response);

    const data = await response.json();

    res.send({
        ok: true,
        data: data
    });
});

module.exports = router;
