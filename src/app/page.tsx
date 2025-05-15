"use client";
import { useEffect } from "react";
import WalletCreator from "./components/WalletCreator";

export default function Home() {
    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    return (
        <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-3xl font-bold">Dev Wallet Creator</h1>
                <a
                    href="https://github.com/KristofferGW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-400 hover:underline mt-2 sm:mt-0"
                >
                    Contact me on GitHub →
                </a>
            </div>
            <WalletCreator />
        </main>
    );
}
