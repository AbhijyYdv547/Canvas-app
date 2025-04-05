import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading] = useState(true);
    const [socket,setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MGYzZDZiZC0xYTU2LTQxMjMtYWJiMy00YjBkNjZjYTE5ZjEiLCJpYXQiOjE3NDM4NDY1NTl9.5ITn4vq4U4hz8gqg4N5K3e6ZH_5gu7eFUvcd48Q6prY`);
        ws.onopen = ()=>{
            setLoading(false);
            setSocket(ws);
        }
    },[])

    return{
        socket,loading
    }
}