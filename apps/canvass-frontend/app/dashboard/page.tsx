"use client";
import { useState, useEffect } from "react";
import { getToken } from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [roomSlug, setRoomSlug] = useState("");
    const [roomName, setRoomName] = useState("");
    const router = useRouter();

    const token = getToken();

    async function createRoom() {
        const res = await fetch("http://localhost:3001/room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name: roomName })
        });

        const data = await res.json();
        if (res.ok) {
            alert("Room created!");
        } else {
            alert(data.message);
        }
    }

    async function joinRoom() {
        const res = await fetch(`http://localhost:3001/room/${roomSlug}`);
        const data = await res.json();

        if (data.room) {
            router.push(`/canvas/${data.room.id}`);
        } else {
            alert("Room not found");
        }
    }

    return (
        <div>
            <h2>Create Room</h2>
            <input placeholder="Room Name" onChange={e => setRoomName(e.target.value)} />
            <button onClick={createRoom}>Create</button>

            <h2>Join Room</h2>
            <input placeholder="Room Slug" onChange={e => setRoomSlug(e.target.value)} />
            <button onClick={joinRoom}>Join</button>
        </div>
    );
}
