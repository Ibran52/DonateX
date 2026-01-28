import React, { useState } from "react"
import { parseEther } from "ethers/lib/utils"

const Donate = ({ state }) => {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        const { contract } = state
        if (!contract) {
            alert("Please connect your wallet first!")
            return
        }

        try {
            setLoading(true)
            setSuccess(false)

            const tempAmount = { value: parseEther(amount.toString()) }
            const tx = await contract.donate(name, message, tempAmount)

            await tx.wait()

            setSuccess(true)
            setTimeout(() => setSuccess(false), 5000)

            // Reset form
            setName("")
            setMessage("")
            setAmount("")

        } catch (error) {
            console.error("Donation error:", error)
            alert(error.reason || "Transaction failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fade-in">
            <div className="glass rounded-2xl p-8 border border-white/10 shadow-2xl max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        Make a Difference Today
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Your donation will be recorded transparently on the blockchain
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-xl p-4 backdrop-blur-sm fade-in">
                        <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <p className="text-green-400 font-semibold">
                                🎉 Donation successful! Thank you for your generosity!
                            </p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-300 block">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                placeholder="Enter your name"
                                required
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                disabled={loading}
                            />
                        </div>

                        {/* Amount Input */}
                        <div className="space-y-2">
                            <label htmlFor="amount" className="text-sm font-medium text-gray-300 block">
                                Amount (ETH)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="amount"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                    placeholder="0.001"
                                    step="0.001"
                                    min="0.001"
                                    required
                                    value={amount}
                                    onChange={(ev) => setAmount(ev.target.value)}
                                    disabled={loading}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                    ETH
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-300 block">
                            Message (Optional)
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                            placeholder="Leave a heartwarming message..."
                            value={message}
                            onChange={(ev) => setMessage(ev.target.value)}
                            disabled={loading}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full glow-on-hover relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center space-x-3">
                                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing Transaction...</span>
                            </span>
                        ) : (
                            <span className="flex items-center justify-center space-x-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                                </svg>
                                <span>Donate Now</span>
                            </span>
                        )}
                    </button>
                </form>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-sm text-blue-300">
                            All donations are securely processed through the Ethereum blockchain.
                            You'll need to confirm the transaction in MetaMask.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donate
