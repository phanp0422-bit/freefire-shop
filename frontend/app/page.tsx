import Link from "next/link"

async function getAccounts() {

  const res = await fetch(
    "http://127.0.0.1:8000/accounts/",
    {
      cache: "no-store"
    }
  )

  return res.json()
}

export default async function Home() {

  const accounts = await getAccounts()

  return (

    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-10 text-orange-500">
        🔥 Free Fire Premium Accounts
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {
          accounts.map((acc: any) => (

            <div
              key={acc.id}
              className="bg-zinc-900 rounded-xl p-5 border border-zinc-700"
            >

              <img
                src={acc.image}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h2 className="text-2xl font-bold">
                {acc.title}
              </h2>

              <p className="mt-2">
                💎 Diamonds: {acc.diamonds}
              </p>

              <p>
                🎮 Level: {acc.level}
              </p>

              <p>
                🔥 Skins: {acc.skins}
              </p>

              <p className="text-green-400 text-xl mt-4 font-bold">
                {acc.price.toLocaleString()} VND
              </p>

              {
                acc.status === "sold" && (

                  <p className="text-red-500 font-bold mt-3">
                    SOLD
                  </p>
                )
              }

              <Link

                href="/payment"

                className={`

                mt-5
                w-full
                block
                text-center
                p-3
                rounded-lg
                font-bold

                ${acc.status === "sold"

                ? "bg-zinc-700 pointer-events-none"

                : "bg-orange-500 hover:bg-orange-600"}

                `}
              >

                {
                  acc.status === "sold"
                  ? "Sold Out"
                  : "Buy Now"
                }

              </Link>

            </div>
          ))
        }

      </div>

    </main>
  )
}