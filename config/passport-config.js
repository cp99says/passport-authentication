const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const user=require('../models/user-model');

passport.serializeUser((user,done)=>{
    done(null,user.id);
})


passport.deserializeUser((id,done)=>{
    done(null,user.id);
})


passport.use(new GoogleStrategy({
    //new google strategy
    callbackURL:'/auth/google/redirect',
    clientID: 'your client id',
    clientSecret: 'your client secret'
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('passport callback function fired:');
    console.log(profile);
    user.findOne({googleId: profile.id}).then((currentuser)=>{
        if(currentuser)
        {
            console.log('user is:-'+currentuser)
            done(null,currentuser)
        }
        else
        {
            new user({
                googleId: profile.id,
                username: profile.displayName
            }).save().then((newUser) => {
                console.log('new user created: ', newUser);
                done(null,newUser)  
            });
        }
    })
    
})   
);