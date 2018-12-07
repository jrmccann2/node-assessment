const express = require('express')
const bodyParser = require('body-parser')
const usersCtrl = require('./usersCtrl')

const app = express();
app.use(bodyParser.json());


app.get('/api/user', usersCtrl.getUsers)
app.get('/api/user/:userId', usersCtrl.getUserById)
app.get('/api/admin', usersCtrl.getAdmins)
app.get('/api/nonadmin', usersCtrl.getNonAdmins)
app.get('/api/type/:userType', usersCtrl.getUsersByType)

app.put('/api/user/:userId', usersCtrl.updateUserById)

app.post('/api/user', usersCtrl.addUser)

app.delete('/api/user/:userId', usersCtrl.deleteUser)


app.listen(3000, () => {
    console.log('Listening on port 3000')
})