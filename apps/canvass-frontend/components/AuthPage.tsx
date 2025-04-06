"use client";
import { Button } from "@repo/ui/button";
export function AuthPage({isSignin}:{
    isSignin:boolean
}){
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-white rounded">
            <div className="p-2 text-black">
            <input type="text" placeholder="Email"  />
            </div>
            <div className="p-2 text-black">
            <input type="password" placeholder="Password" />
            </div>

            <div className="pt-2">

            <Button size="sm" variant="primary" onClick={()=>{}}>
                {isSignin ? "Sign in":"Sign up"}
                </Button>
            </div>
        </div>
    </div>
}