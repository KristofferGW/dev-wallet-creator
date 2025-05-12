import { useState } from "react";
import { ethers } from "ethers";

export default function WalletCreator() {
    const [wallets, setWallets] = useState<{ address: string; privateKey: string }[]>([]);
    const [copied, setCopied] = useState<{ index: number; type: "address" | "privateKey" } | null>(null);

    const createWallet = () => {
        console.log("Creating wallet...");
        const wallet = ethers.Wallet.createRandom();
        setWallets((prev) => [...prev, { address: wallet.address, privateKey: wallet.privateKey }]);
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
            <div className="flex justify-center mb-6">
                <button
                    onClick={createWallet}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded mb-6 cursor-pointer"
                >
                    Create Test Wallet
                </button>
            </div>
            {wallets.slice().reverse().map((wallet, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700 overflow-x-auto">
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