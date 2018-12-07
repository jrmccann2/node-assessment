const userData = require('./userData.json')
const bodyParser = require('body-parser')
const express = require('express')
const app = express();

app.use(bodyParser.json())

module.exports = {

    getUsers: (req, res, next) => {
        console.log(req.query)
        let {age, favorites, lastname, email} = req.query

        if(age){
            let sort = userData.filter( (person) => person.age < age)
            res.status(200).send(sort)
        } else if(favorites){
            let sort = userData.filter( (person) => person.favorites.includes(favorites))
            res.status(200).send(sort)
        } else if(lastname){
            console.log(lastname)
            let sort = userData.filter( (person) => person.last_name === lastname)
            res.status(200).send(sort)
        } else if(email){
            let sort = userData.filter( (person) => person.email === email)
            res.status(200).send(sort)
        } else {
            console.log('all')
            res.status(200).send(userData)
        }
    },

    getUserById: (req, res, next) => {
        const {userId} = req.params
        console.log(userId)

        let userInfo = userData.find( (person) => person.id === +userId)
            if(userInfo){
            console.log(userInfo)
            res.status(200).send(userInfo)
            } else {
                res.status(404).json(null)
            }
        
    },

    getAdmins: (req, res, next) => {
        let admins = userData.filter( (person) => person.type === "admin")
        res.status(200).send(admins)
    },
    
    getNonAdmins: (req, res, next) => {
        let nonAdmins = userData.filter( (person) => person.type != "admin")
        res.status(200).send(nonAdmins)
    },
    
    getUsersByType: (req, res, next) => {
        const {userType} = req.params
        let users = userData.filter( (person) => person.type === userType)
        res.status(200).send(users)
    },
    
    updateUserById: (req, res, next) => {
        const {userId} = req.params
        console.log(req.body)
        let users = userData.map( (person) => person.id === +userId ? person = req.body : person)
        res.status(200).send(users)
    },
    
    addUser: (req, res, next) => {
        req.body.id = userData.length+1
        userData.push(req.body)
        res.status(200).send(userData)
    },
    
    deleteUser: (req, res, next) => {
        const {userId} = req.params
        userData.splice(userData.findIndex( (person) => person.id === +userId), 1)
        res.status(200).send(userData)
    }
}