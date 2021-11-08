const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const auth = require("json-server-auth");

const middlewares = jsonServer.defaults();
server.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  reports: 660,
});

server.use(middlewares);
server.use(rules);
server.use(auth);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.isActive = true;
  }
  if (req.method === "PUT") {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.use(router);

server.listen(3003, () => {
  console.log("JSON Server is running");
});
