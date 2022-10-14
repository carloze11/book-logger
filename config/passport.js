const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')


module.exports = function(passport) {
    // const authenticateUser = (username, password, done) => {
    //     const user = getUserByUsername(username)
    //     if (!user) {
    //         return done (null, false, {msg: 'No user with that username'})
    //     }

    //     try {
    //         if (await.bcrypt.compare(password, user.password)) {
    //             return done(null, user)
    //         } else {
    //             return done(null, false, {msg: 'Password incorrect'})
    //         }

    //     } catch (e) {
    //         return done(e)
    //     }
    // }
    passport.use(new LocalStrategy({ usernameField: 'username'}, (username, password, done) => {
        User.findOne({ userName: username.toLowerCase()}, (err, user) => {
            if (err) {return done(err)}
            if (!user) {
                return done(null, false, { msg: `Username ${username} not found.`})
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) {return done(err)}
                if (isMatch) {
                    return done(null, user)
                }
                return done(null, false, {msg: 'Invalid email or password.'})
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}
