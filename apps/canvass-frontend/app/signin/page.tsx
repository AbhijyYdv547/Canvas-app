"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/hooks/useAuthToken";

export default function Signin() {
    const [form, setForm] = useState({ username: "", password: "" });
    const router = useRouter();

    async function handleSignin() {
        const res = await fetch("http://localhost:3001/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        if (res.ok && data.token) {
            setToken(data.token);
            router.push("/dashboard");
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button onClick={handleSignin}>Signin</button>
        </div>
    );
}
