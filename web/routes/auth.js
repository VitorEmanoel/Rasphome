const express = require('express');

const router = express.Router();

router.post("/auth", (req, res) =>{

    const {user, password } = req.body;

});

module.exports = router;