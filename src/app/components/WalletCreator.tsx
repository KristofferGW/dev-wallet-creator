import { useState } from "react";
import bs58 from "bs58";
import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";

export default function WalletCreator() {
    const [wallets, setWallets] = useState<{ address: string; privateKey: string, createdAt: string }[]>([]);
    const [chain, setChain] = useState<"ethereum" | "solana">("ethereum");
    const [copied, setCopied] = useState<{ index: number; type: "address" | "privateKey" } | null>(null);
    const [count, setCount] = useState(1);

    const createWallets = () => {
        const newWallets = Array.from({ length: count }, () => {
            if (chain === "ethereum") {
                const wallet = ethers.Wallet.createRandom();
                return {
                    address: wallet.address,
                    privateKey: wallet.privateKey,
                    createdAt: new Date().toLocaleString(),
                };
            } else {
                const wallet = Keypair.generate();
                return {
                    address: wallet.publicKey.toBase58(),
                    privateKey: bs58.encode(wallet.secretKey),
                    createdAt: new Date().toLocaleString(),
                };
            }
        });

        setWallets((prevWallets) => [...prevWallets, ...newWallets]);
    };


    const exportToCSV = () => {
        if (wallets.length === 0) return;

        const headers = ["Address", "Private Key", "Created At"];
        const rows = wallets.map(wallet => [wallet.address, wallet.privateKey, wallet.createdAt]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `wallets_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const copyToClipboard = async (text: string, index: number, type: "address" | "privateKey") => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied({ index, type });
            setTimeout(() => setCopied(null), 2000);
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Dev Wallet Creator</h1>
            <select
                value={chain}
                onChange={(e) => setChain(e.target.value as "ethereum" | "solana")}
                className="w-40 px-2 py-1 rounded border border-gray-600 bg-gray-900 text-white text-center mb-2"
            >
                <option value="ethereum">Ethereum</option>
                <option value="solana">Solana</option>
            </select>

            <div className="flex flex-col items-center mb-6 gap-2">
                <input
                    type="number"
                    min={1}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-32 px-2 py-1 rounded border border-gray-600 bg-gray-900 text-white text-center"
                />
                <button
                    onClick={createWallets}
                    className={`${count < 1 ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                        } text-white font-medium py-2 px-4 rounded`}
                    disabled={count < 1}
                >
                    {count < 1 ? "Don't be ridiculous" : count === 1 ? "Create Wallet" : "Create Wallets"}
                </button>
                <button
                    onClick={exportToCSV}
                    className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded ${wallets.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={wallets.length === 0}
                >
                    Export to CSV
                </button>

            </div>
            {wallets.slice().reverse().map((wallet, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700 overflow-x-auto">
                    <p className="text-xs text-gray-400 mb-2">Created: {wallet.createdAt}</p>
                    <p className="font-semibold mb-1">Address:</p>
                    <p className="text-center break-words">{wallet.address}</p>
                    <button
                        onClick={() => copyToClipboard(wallet.address, index, "address")}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 text-xs rounded cursor-pointer"
                    >
                        {copied?.index === index && copied?.type === "address" ? "Copied address!" : "Copy address"}
                    </button>

                    <div className="mt-2">
                        <p className="font-semibold mb-1">Private Key:</p>
                        <p className="text-center break-words">{wallet.privateKey}</p>
                        <button
                            onClick={() => copyToClipboard(wallet.privateKey, index, "privateKey")}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 text-xs rounded cursor-pointer"
                        >
                            {copied?.index === index && copied?.type === "privateKey" ? "Copied private key!" : "Copy private key"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}