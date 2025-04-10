"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [form, setForm] = useState({ username: "", password: "", name: "" });
    const router = useRouter();

    async function handleSignup() {
        const res = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        if (res.ok) {
            router.push("/signin");
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}
