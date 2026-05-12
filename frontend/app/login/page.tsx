"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function login() {

    const res = await fetch(
      "http://127.0.0.1:8000/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          password
        })
      }
    )

    const data = await res.json()

    if (data.access_token) {

      localStorage.setItem(
        "token",
        data.access_token
      )

      alert("Login success")

      router.push("/admin")

    } else {

      alert(data.error)
    }
  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <div className="space-y-4">

          <input
            placeholder="Username"
            className="w-full p-4 rounded bg-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded bg-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-orange-500 hover:bg-orange-600 p-4 rounded font-bold"
          >
            Login
          </button>

        </div>

      </div>

    </main>
  )
}