function connect() {
  const socket = new WebSocket("ws://localhost:8080");

  // Connection opened
  socket.addEventListener("open", function(event) {
    socket.send("Hello Server!", event);
  });

  // Listen for messages
  socket.addEventListener("message", function(event) {
    console.log("Message from server ", event);
  });

  socket.addEventListener("error", function(event) {
    console.log("WS Error ", event);
  });

  socket.addEventListener("close", function(event) {
    console.log("Closed connection ", event);
  });
}
