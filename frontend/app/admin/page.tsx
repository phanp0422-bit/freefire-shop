"use client"

import { useEffect, useState } from "react"


import { useRouter } from "next/navigation"


export default function AdminPage() {

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [level, setLevel] = useState("")
  const [diamonds, setDiamonds] = useState("")
  const [skins, setSkins] = useState("")
  const [image, setImage] = useState("")
  const router = useRouter()

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {

        router.push("/login")
    }

}, [])

  async function createAccount() {

  await fetch(
    "http://127.0.0.1:8000/accounts/",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        title,

        price: Number(price),

        level: Number(level),

        diamonds: Number(diamonds),

        skins: Number(skins),

        image
      })
    }
  )

  alert("Account created")
}

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>
        <button
  onClick={() => {

    localStorage.removeItem("token")

    router.push("/login")
  }}

  className="bg-red-500 px-4 py-2 rounded"
>
  Logout
</button>
      <div className="max-w-xl space-y-4">

        <input
          placeholder="Account Title"
          className="w-full p-4 rounded bg-zinc-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Price"
          className="w-full p-4 rounded bg-zinc-900"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Level"
          className="w-full p-4 rounded bg-zinc-900"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <input
          placeholder="Diamonds"
          className="w-full p-4 rounded bg-zinc-900"
          value={diamonds}
          onChange={(e) => setDiamonds(e.target.value)}
        />

        <input
          placeholder="Skins"
          className="w-full p-4 rounded bg-zinc-900"
          value={skins}
          onChange={(e) => setSkins(e.target.value)}
        />

        <input
        placeholder="Image URL"
        className="w-full p-4 rounded bg-zinc-900"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        />

        <button
          onClick={createAccount}
          className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded font-bold"
        >
          Create Account
        </button>

      </div>

    </main>
  )
}
