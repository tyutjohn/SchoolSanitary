/*
 * @Author: johnwang
 * @since: 2019-11-01 21:44:14
 * @lastTime: 2019-11-01 22:02:49
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const secretOrKey=require('../config/mongodb').secretOrKey;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;
const mongoose=require('mongoose');
const User=mongoose.model('users');
module.exports=passport=>{
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        // console.log(jwt_payload);
        const user=await User.findById(jwt_payload.id);
        if(user){
            return done(null,user)
        }else{
            return done(null,false);
        }
    }));
};