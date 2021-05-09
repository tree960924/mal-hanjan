const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Saying = require('./models/Saying');
const session = require('express-session');

router.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

router.get('/isLogined', (req, res)=>{
    console.log(req.session.isLogined);
    if(req.session.isLogined){
        res.json({result : req.session.isLogined, name : req.session.user.name});
    }
    else{
        res.json({result : false, name : undefined});
    }
    
})

router.post('/account/new', async(req, res) => {//계정 생성
    await User.create(req.body)
    .then(function(new_user){
        console.log(new_user);
        res.json({result:'succes'});
    }).catch(function(err){
        res.json({result:'fail'});
    })
})

router.post('/account/login', async(req, res)=>{//로그인
    let {id, pw} = req.body;
    let sess = req.session;

    let user_data = await User.findOne({id:id});

    if(user_data === null){
        res.send('fail');
    } 
    else if(user_data.pw === pw){
        sess.user = {id : user_data._id, name : user_data.name};
        sess.isLogined = true;
        console.log(sess);
        res.send('success');
    }
    else{
        res.send('fail');
    }
});

router.get('/account/:id/exist', async(req, res)=>{//아이디 존재 여부
    let user_data = await User.findOne({id:req.params.id});
    if(user_data){
        res.send(true);
    }
    else{
        res.send(false);
    }
});

router.get('/sayings', async(req, res)=>{
    let tags = req.query.tags.split(',');

    let contents = await Saying.find({tags : {$in : tags}}); 
    res.json(contents);
})

module.exports = router;