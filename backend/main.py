import random
from typing import Dict
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str = "guest"):
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
        # remove client from list not working
        self.active_connections.pop(client_id)
        await self.send_broadcast({"data": "userLeft", "client_id": client_id})

    def get_unique_client_id(self, id) -> str:
        return f"{id}-{random.randint(0, 1000)}"

    async def send_personal_message(self, message: dict, client_id: str):
        await self.active_connections[client_id].send_json(
            {"type": "personal", **message})

    async def send_broadcast(self, message: dict):
        inactives = []
        for connection in self.active_connections:
            try:
                await self.active_connections[connection].send_json(
                    {"type": "brodcast", **message})
            except RuntimeError:
                inactives.append(connection)
        # clean up inactive connections
        for inactive in inactives:
            self.active_connections.pop(inactive)


manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, client: str = None):
    print(client)
    await manager.connect(websocket, client)

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
        await manager.disconnect(websocket, client)
    finally:
        if websocket in manager.active_connections.values():
            print("cleaned in final")
            await manager.disconnect(websocket, client)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(
        "main:app",
        port=8001, reload=True,
    )
