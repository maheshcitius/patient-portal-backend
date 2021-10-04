const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const auth = require('json-server-auth')

const middlewares = jsonServer.defaults()
server.db = router.db

const rules = auth.rewriter({
    // Permission rules
    products: 660
  
  })

server.use(middlewares)
server.use(rules)
server.use(auth)
server.use(router)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
  })



server.listen(3003, () => {
  console.log('JSON Server is running')
})

