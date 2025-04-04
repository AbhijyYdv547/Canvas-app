import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws) {
    console.log("hello");
    ws.on("message", () => {
        ws.send("ping")
    })

})