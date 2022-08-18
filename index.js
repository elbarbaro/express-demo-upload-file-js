const express = require('express')
const app = express()
const port = 3000
const fileUpload = require('express-fileupload')

const UPLOAD_PATH = __dirname + '/public/mis-imagenes/uploads'
console.log(UPLOAD_PATH)

app.use(fileUpload({
    limits: { fieldSize:  50 * 1024 * 1024 }
}))

app.use(express.static('public'))

app.get('/hello-world', (request, response) => {
    const name = request.query.name || ''
    response.send(`Hello World, ${name}`)
})

app.get('/hello-world', (request, response) => {
    response.send('Hello World')
})

app.get('/users', (request, response) => {
    const users = [
        {
            name: "Leo",
            image: "http://localhost:3000/mis-imagenes/uploads/0__kermitfrog_4.jpeg"
        },
        {
            name: "Rafa",
            image: ""
        },
        {
            name: "Lupita",
            image: ""
        },
        {
            name: "Jorge",
            image: ""
        }
    ]
    response.send(users)
})

app.post('/users', (request, response) => {
    const photo = request.files.photo
    const uploadFileName = `${UPLOAD_PATH}/${photo.name}`
    photo.mv(uploadFileName, err => {
        if(err)
            return response.status(500).send(err)
        response.send('Create user')
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})