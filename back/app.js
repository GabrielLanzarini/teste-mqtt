const mqtt = require("mqtt")
const { Server } = require("socket.io");

const client = mqtt.connect("mqtt://18.231.122.111", { password: "cesul", username: "cesul" });

const io = new Server({ cors: { origin: "http://localhost:5173" } })

client.on("connect", () => {
  client.subscribe("barraca_pastel", "barraca_suco");
  // Tópicos que você quer escutar
});

client.on("message", (topic, message) => {
  io.emit(topic, message.toString());
});


io.listen(3000);
