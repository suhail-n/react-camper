// server.js
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  camps: 664,
  comments: 664,
  // "/camps": "/644/camps",
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);
server.listen(8000, () => {
  console.log("JSON Server is running");
});
