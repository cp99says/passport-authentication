const express = require('express')
const app = express();
const mongoose=require('mongoose')
const cookieSession=require('cookie-session')
app.set('view engine', 'ejs')
const routes = require('./routes/auth-route')
const passport=require('passport')

app.use(passport.initialize())
app .use(passport.session())

app.use('/auth', routes)
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['thenetninjaisawesomeiguess']
}))




app.get('/', (req, res) => {
    res.render('home')
})


mongoose.connect('<your mongo connecction url>',{useNewUrlParser:true, useUnifiedTopology:true},()=>{console.log('db connected')});
const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => { console.log(`server started at ${PORT}`) })