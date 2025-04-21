// src/app/explorer/page.tsx
"use client";

import { useExplorerNFTs } from "@/lib/useExplorerNFTs";
import { useEffect, useState } from "react";

interface NFTMetadata {
    name: string;
    description: string;
    image: string;
}

export default function ExplorerPage() {
    const { tokenURIs, total } = useExplorerNFTs();
    const [nfts, setNfts] = useState<NFTMetadata[]>([]);

    useEffect(() => {
        const fetchMetadata = async () => {
            const results = await Promise.all(
                tokenURIs.map(async (uri) => {
                    try {
                        const res = await fetch(uri);
                        return await res.json();
                    } catch (err) {
                        console.error("❌ 메타데이터 로드 실패:", uri);
                        return null;
                    }
                })
            );
            setNfts(results.filter((meta): meta is NFTMetadata => !!meta));
        };

        fetchMetadata();
    }, [tokenURIs]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-400 mb-6">📦 Explorer</h1>
            <p className="mb-4 text-gray-400">총 민팅된 NFT: {total?.toString()}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {nfts.map((nft, idx) => (
                    <div key={idx} className="bg-[#222] rounded-xl p-4 shadow-lg">
                        <img
                            src={nft.image}
                            alt={nft.name}
                            className="rounded-lg w-full h-60 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold text-white">{nft.name}</h2>
                        <p className="text-sm text-gray-400">{nft.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
