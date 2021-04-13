const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.post('/account/new', async(req, res) => {//계정 생성
    await User.create(req.body)
    .then(function(new_user){
        console.log(new_user);
        res.json({result:'succes'});
    }).catch(function(err){
        res.json({result:'fail'});
    })

})

router.get('/account/:id/exist', async(req, res)=>{//아이디 존재 여부
    let user_data = await User.findOne({id:req.params.id});
    if(user_data){
        res.send(true);
    }
    else{
        res.send(false);
    }
});

router.post('/account/login', async(req, res)=>{//로그인
    let {id, pw} = req.body;
    
    let user_data = await user_control.find(id);
    if(user_data.pw === pw){
        res.send('success');
    }
    else{
        res.send('fail');
    }
});


module.exports = router;