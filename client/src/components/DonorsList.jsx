import React, { useEffect, useState } from "react"
import { BigNumber } from "ethers"

const DonorsList = ({ state }) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const { contract } = state

    useEffect(() => {
        const fetchList = async () => {
            try {
                setLoading(true)
                const tempList = await contract.getDonor()
                setList(tempList)
                setLoading(false)
            } catch (error) {
                console.error("Error Fetching data:", error)
                setLoading(false)
            }
        }

        if (contract) {
            fetchList()
        }
    }, [contract])

    const convertDayTime = (hexTime) => {
        const decimalTimestamp = BigNumber.from(hexTime).toNumber()
        const date = new Date(decimalTimestamp * 1000)
        const day = date.toLocaleDateString("en-US", {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        const time = date.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit'
        })
        return { day, time }
    }

    const formatAddress = (address) => {
        return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`
    }

    if (loading) {
        return (
            <div className="fade-in">
                <div className="glass rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-8">
                        Our Amazing Donors
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse flex space-x-4 p-4 bg-white/5 rounded-xl">
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fade-in">
            <div className="glass rounded-2xl p-8 border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        Our Amazing Donors
                    </h2>
                    <p className="text-gray-400">
                        Thank you to everyone who contributed to making a difference
                    </p>
                </div>

                {/* Donors List */}
                {list && list.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        Donor
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                                        Message
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                                        Wallet Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {list.map((item, index) => {
                                    const { day, time } = convertDayTime(item.timestamp)
                                    return (
                                        <tr
                                            key={index}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                                        {item.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{item.name}</p>
                                                        <p className="text-gray-500 text-sm md:hidden">{day}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <p className="text-gray-300 max-w-md truncate">
                                                    {item.message || <span className="text-gray-600 italic">No message</span>}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 hidden sm:table-cell">
                                                <div className="text-sm">
                                                    <p className="text-white font-medium">{day}</p>
                                                    <p className="text-gray-500">{time}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <div className="flex items-center space-x-2">
                                                    <code className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg font-mono">
                                                        {formatAddress(item.from)}
                                                    </code>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(item.from)
                                                            alert("Address copied!")
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-opacity"
                                                        title="Copy address"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">No Donations Yet</h3>
                        <p className="text-gray-500">
                            Be the first to make a donation and support this cause!
                        </p>
                    </div>
                )}

                {/* Stats */}
                {list && list.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-400">
                                    Total Donors: <span className="text-white font-semibold">{list.length}</span>
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">
                                All transactions verified on-chain
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DonorsList
