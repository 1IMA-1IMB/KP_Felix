const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('User List')
})

router.get('/new', (req, res) => {
    res.send('User New Form')
})

router.post('/', (req, res) => {
    res.send('Create User')
})

router.route('/:id')
.get((req, res) => {
    req.params.id
    res.send(`Get User with ID ${req.params.id}`)
})
.put((req, res) => {
    req.params.id
    res.send(`Update User with ID ${req.params.id}`)
})
.delete((req, res) => {
    req.params.id
    res.send(`Delete User with ID ${req.params.id}`)
})
// router.get('/:id', (req, res) => {
//     req.params.id
//     res.send(`Get User with ID ${req.params.id}`)
// })

// router.put('/:id', (req, res) => {
//     req.params.id
//     res.send(`Update User with ID ${req.params.id}`)
// })


// router.delete('/:id', (req, res) => {
//     req.params.id
//     res.send(`Delete User with ID ${req.params.id}`)
// })



module.exports = router