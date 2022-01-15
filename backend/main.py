from fastapi import FastAPI, WebSocket

app = FastAPI()


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_json({"type": "brodcast", "data": message})

    async def send_broadcast(self, message: dict, websocket: WebSocket):
        for connection in self.active_connections:
            await connection.send_json({"type": "brodcast", **message})


manager = ConnectionManager()


@app.get('/')
async def root():
    return {'message': 'Hello World'}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_json()

            if data["type"] == "play":
                await manager.send_broadcast({"data": "play"}, websocket)

            elif data["type"] == "pause":
                await manager.send_broadcast({"data": "pause"}, websocket)

            elif data["type"] == "goToSecond":
                await manager.send_broadcast(
                    {"data": "goToSecond", "second": data["second"]}, websocket)

            else:
                print("[another commend]", data)

    except Exception as e:
        await manager.disconnect(websocket)
        print("disconnect", e)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(
        "main:app",
        host="192.168.1.104",
        port=8001,
        ssl_keyfile="cert.key",
        ssl_certfile="cert.crt"
    )