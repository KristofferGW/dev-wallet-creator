import { useState } from "react";
import { ethers } from "ethers";
import { stringify } from "querystring";

export default function WalletCreator() {
    const [wallets, setWallets] = useState<{ address: string; privateKey: string }[]>([]);

    const createWallet = () => {
        const wallet = ethers.Wallet.createRandom();
        setWallets((prev) => [...prev, { address: wallet.address, privateKey: wallet.privateKey }]);
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dev Wallet Creator</h1>
            <button
                onClick={createWallet}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded mb-6"
            >
                Create Test Wallet
            </button>
            {wallets.map((wallet, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700">
                    <p><span className="font-semibold">Address:</span> {wallet.address}</p>
                    <p><span className="font-semibold">Private Key:</span> {wallet.privateKey}</p>
                </div>
            ))}
        </div>
    );
}