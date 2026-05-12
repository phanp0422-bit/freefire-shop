"use client"

import { useState } from "react"

export default function RegisterPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function register() {

    const res = await fetch(
      "http://127.0.0.1:8000/auth/register",
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

    alert(data.message || data.error)
  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Register
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
            onClick={register}
            className="w-full bg-orange-500 hover:bg-orange-600 p-4 rounded font-bold"
          >
            Register
          </button>

        </div>

      </div>

    </main>
  )
}