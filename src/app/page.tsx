"use client";
import { useEffect } from "react";
import WalletCreator from "./components/WalletCreator";

export default function Home() {
    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    return (
        <main className="min-h-screen bg-gray-900 text-white p-8">
            <WalletCreator />
        </main>
    );
}