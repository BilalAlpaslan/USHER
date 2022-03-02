import random
from typing import Dict
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()

        while client_id in self.active_connections.keys():
            client_id = self.get_unique_client_id(client_id)

        self.active_connections[client_id] = websocket
        await self.send_broadcast({"data": "newUser", "client_id": client_id})
        await self.send_personal_message(
            {
                "data": "room",
                "persons": [i for i in self.active_connections]
            }, client_id)

    async def disconnect(self, websocket: WebSocket, client_id: str):
        self.active_connections.pop(client_id) # remove client from list not working
        await self.send_broadcast({"data": "userLeft", "client_id": client_id})

    def get_unique_client_id(self, id) -> str:
        return f"{id}-{random.randint(0, 1000)}"

    async def send_personal_message(self, message: dict, client_id: str):
        await self.active_connections[client_id].send_json(
            {"type": "personal", **message})

    async def send_broadcast(self, message: dict):
        for connection in self.active_connections:
            await self.active_connections[connection].send_json(
                {"type": "brodcast", **message})


manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, client_id: str = None):
    await manager.connect(websocket, client_id)

    try:
        while True:
            data = await websocket.receive_json()

            if data.get("type") == "play":
                await manager.send_broadcast({"data": "play"})

            elif data.get("type") == "pause":
                await manager.send_broadcast({"data": "pause"})

            elif data.get("type") == "goToSecond":
                await manager.send_broadcast(
                    {"data": "goToSecond", "second": data["second"]})

            else:
                print("[another commend]", data)

    except WebSocketDisconnect:
        await manager.disconnect(websocket, client_id)
        await manager.send_broadcast({"data": "disconnect", "user": client_id})

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(
        "main:app",
        host="192.168.1.104", port=8001, reload=True,
    )
