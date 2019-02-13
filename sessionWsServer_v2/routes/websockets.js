const { Router } = require("express");
const router = Router();

router.ws("/echo", function(ws, req) {
  ws.on("message", function(msg) {
    ws.send(`>> ${msg}`);
  });
});

module.exports = router;
