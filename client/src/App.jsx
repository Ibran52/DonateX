import { useEffect, useState } from "react"
import abi from "./contract/Donate.json"
import { ethers } from "ethers"
import Donate from "./components/Donate"
import DonorsList from "./components/DonorsList"

const App = () => {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    })

    const [account, setAccount] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const connectWallet = async () => {
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
        const contractABI = abi.abi

        if (typeof window.ethereum === "undefined") {
            setError("Please install MetaMask to use this dApp!")
            return
        }

        try {
            setLoading(true)
            setError("")

            const { ethereum } = window
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            })

            window.ethereum.on("accountsChanged", () => {
                window.location.reload()
            })

            window.ethereum.on("chainChanged", () => {
                window.location.reload()
            })

            setAccount(accounts[0])

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()

            const contract = new ethers.Contract(contractAddress, contractABI, signer)
            setState({ provider, signer, contract })
            setLoading(false)
        } catch (error) {
            console.error(error)
            setError("Failed to connect wallet. Please try again.")
            setLoading(false)
        }
    }

    const formatAddress = (address) => {
        if (!address) return ""
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    }

    return (
        <div className="min-h-screen">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* NavBar */}
            <nav className="relative z-10">
                <div className="glass backdrop-blur-md border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-5">
                        <div className="flex justify-between items-center">
                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                        DonateX
                                    </h1>
                                    <p className="text-xs text-gray-400">Blockchain-Powered Donations</p>
                                </div>
                            </div>

                            {/* Wallet Connection */}
                            <div>
                                {account ? (
                                    <div className="flex items-center space-x-3">
                                        <div className="glass px-5 py-2.5 rounded-xl border border-white/20">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                <span className="text-sm font-medium text-gray-200">
                                                    {formatAddress(account)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="glow-on-hover relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={connectWallet}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center space-x-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Connecting...</span>
                                            </span>
                                        ) : (
                                            "Connect Wallet"
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Error Message */}
            {error && (
                <div className="max-w-7xl mx-auto px-6 mt-6">
                    <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                            </svg>
                            <p className="text-red-400 font-medium">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
                {account ? (
                    <div className="space-y-10 fade-in">
                        <Donate state={state} />
                        <DonorsList state={state} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 fade-in">
                        <div className="w-32 h-32 gradient-bg rounded-full flex items-center justify-center shadow-2xl pulse-slow">
                            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Welcome to DonateX
                        </h2>
                        <p className="text-xl text-gray-400 text-center max-w-2xl">
                            Connect your wallet to start making secure, transparent donations on the blockchain
                        </p>
                        <div className="flex items-center space-x-2 text-gray-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-sm">Secured by Ethereum Blockchain</span>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="relative z-10 mt-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <p className="text-center text-gray-500 text-sm">
                        © 2026 DonateX. Powered by Ethereum & Web3
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
