"use client";
import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { useRef, useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { getToken } from "@/hooks/useAuthToken";

export function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const token = getToken();
        const ws = new WebSocket(`${WS_URL}?token=${token}`)

        ws.onopen = () => {
            setSocket(ws)
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
        }
    }, [])


    if (!socket) {
        return (
            <div>
                Connecting to server........
            </div>
        )
    }


    return (
        <div>
            <Canvas roomId={roomId} socket={socket} />
        </div>
    )
}