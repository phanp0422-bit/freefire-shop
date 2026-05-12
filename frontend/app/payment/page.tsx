export default function PaymentPage() {

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">

      <div className="bg-zinc-900 p-10 rounded-xl max-w-md w-full text-center">

        <h1 className="text-3xl font-bold mb-6 text-orange-500">
          QR Banking Payment
        </h1>

        <img
          src="/qr.png"
          className="w-72 mx-auto rounded-xl mb-6"
        />

        <div className="space-y-3 text-left">

          <p>
            Bank: MB Bank
          </p>

          <p>
            Account Name: PHAN HONG QUAN
          </p>

          <p>
            Content:
            <span className="text-orange-500">
              ORDER123
            </span>
          </p>

        </div>

        <button
          className="mt-8 w-full bg-orange-500 hover:bg-orange-600 p-4 rounded-lg font-bold"
        >
          I Have Paid
        </button>

      </div>

    </main>
  )
}