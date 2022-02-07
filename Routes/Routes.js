const UserModel = require('../Models/User.js')
const express = require('express')
const app = express()
const path = require('path')
const sep = path.sep

app.get('/', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}${sep}..${sep}src${sep}index.html`))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}${sep}..${sep}src${sep}signup.html`))
})

app.post('/signup', async (req, res) => {

    const tempUser = new UserModel(
        {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            createon: new Date()
        }
    )

    await tempUser.save()

    res.redirect('http://localhost:3000')
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}${sep}..${sep}src${sep}login.html`))
})

app.post('/login', async(req, res) => {

    const uname = req.body.username.toString()

    const user = await UserModel.findOne({username: uname})

    if (req.body.password.toString() != user.password) {
        console.log('fail')
        return res.status(403).send("Wrong Password")
    } else {
        console.log('success')
        return res.status(200).send("Success")
    }
})

module.exports = app