const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

app.use(bodyParser.json())

const Employee = mongoose.model("employee")

const mongoUri = "mongodb+srv://cnq:mHjPN6wrILu2eCbJ@cluster0.huttz.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo Yeahhh")
})
mongoose.connection.on("error", (error) => {
    console.log("error", error)
})

app.get('/', (req, res) => {
    Employee.find({}).then(data => {
        res.send(data)
    })
    .catch(err => {
        console.log(err)
    })
    
})

app.post('/send-data', (req, res) =>{
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        picture: req.body.picture,
        position: req.body.position
    })
    employee.save()
    .then(data => {
        console.log(data)
        res.send(data)
    })
    .catch(err=> {
        console.log(error)
    })
    
})

app.post('/delete', (req,res) => {
    Employee.findByIdAndRemove(req.body.id)
    .then(data => {
        console.log(data)
        res.send(data)
    })
    .catch(err=> {
        console.log(error)
    })
    
})

app.post('/update', (req,res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        picture: req.body.picture,
        position: req.body.position
    })
    .then(data=> {
        console.log(data)
        res.send(data)
    })
    .catch(err=> {
        console.log(error)
    })
})

app.listen(3000, () => {
    console.log("server running")
})


