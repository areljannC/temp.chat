const server = require('express')()
const port = 4000

server.get('/', (req, res) => res.send('hi'))

server.listen(port, () => console.log(`Server running on port ${port}`))