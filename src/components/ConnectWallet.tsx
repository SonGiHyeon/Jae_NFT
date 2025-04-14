'use client';

import { useState, useEffect } from 'react';

export default function ConnectWallet() {
    const [account, setAccount] = useState<string | null>(null);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                setAccount(accounts[0]);
            } catch (err) {
                console.error('지갑 연결 오류:', err);
            }
        } else {
            alert('MetaMask가 설치되어 있지 않습니다.');
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                setAccount(accounts[0] || null);
            });
        }
    }, []);

    return (
        <div className="text-center mt-8">
            {account ? (
                <div className="text-green-400">
                    ✅ 연결됨: <span className="font-mono">{account}</span>
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all"
                >
                    MetaMask 연결
                </button>
            )}
        </div>
    );
}
