const express = require('express');
const router = express.Router();
const User = require('./models/User');



router.post('/account/new', async(req, res) => {//계정 생성
    // let new_user = new User(req.body);
    // await new_user.save().catch(function(err){
    //     console.log('err occur');
    //     console.log(err.message);
    // });

    await User.create(req.body)
    .then(function(new_user){
        console.log(new_user);
        res.json({result:'succes'});
    }).catch(function(err){
        res.json({result:'fail'});
    })

})


module.exports = router;