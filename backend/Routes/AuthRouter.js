const {signupValidation, loginValidation} = require('../Middlewares/AuthValidation');
const {signup, login} = require('../Controller/AuthController')

const router = require('express').Router();

router.get('/',(req, res)=>{
    res.send('welcome')
})

router.post('/login', loginValidation, login)

router.post('/signup',signupValidation, signup)

module.exports = router;