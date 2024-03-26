const mqtt = require("mqtt")
const { Server } = require("socket.io");

const client = mqtt.connect("mqtt://<seu_ip>", { password: "<senha>", username: "<usuário>" });

const io = new Server({ cors: { origin: "http://localhost:5173" } })

client.on("connect", () => {
  client.subscribe("<Topico1>", "<Topico2>"); // Tópicos que você quer escutar
});

client.on("message", (topic, message) => {
  io.emit(topic, message.toString());
});


io.listen(3000);
