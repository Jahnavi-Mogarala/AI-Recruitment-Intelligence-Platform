from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_text(json.dumps(message))

manager = ConnectionManager()

@router.websocket("/ws/notifications")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time dashboard notifications.
    """
    await manager.connect(websocket)
    try:
        while True:
            # We just wait for incoming messages.
            # In a real app, Redis Pub/Sub would trigger broadcasts here.
            data = await websocket.receive_text()
            # Echo back for testing
            await manager.broadcast({"type": "echo", "message": f"Received: {data}"})
    except WebSocketDisconnect:
        manager.disconnect(websocket)
