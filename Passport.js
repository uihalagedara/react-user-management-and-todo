const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const User = require('./models/User')

const cookieExtractor = req =>{
    let token = null
    if(req && req.cookies){
        token = req.cookies["access_token"]
    }
    return token
}

passport.use(new jwtStrategy({  //authorization
    jwtFromRequest : cookieExtractor,
    secretOrKey : "NoobCoder"
},(payload,done)=>{
    User.findById({_id : payload.sub},(err,user)=>{
        if(err)
            return done (err,false)
        if(user)
            return done(null,user)
        else
            return done(null,false)
    })
}))

passport.use(new LocalStrategy((username,password,done)=>{  //authenticated local strategy using username and password
    User.findOne({username}, (err,user)=>{
        if(err) //something went wrong with database
            return done(err)
        if(!user)//no user exist
            return done(null,false)
        user.comparePassword(password,done) //check password is correct
    })
}))