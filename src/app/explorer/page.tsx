"use client";

import { useExplorerNFTs } from "@/lib/useExplorerNFTs";
import { useEffect, useState } from "react";

interface NFTMetadata {
    name: string;
    description: string;
    image: string;
}

export default function ExplorerPage() {
    const { nfts, total } = useExplorerNFTs();
    const [metadataList, setMetadataList] = useState<
        (NFTMetadata & { owner: string })[]
    >([]);

    useEffect(() => {
        const fetchMetadata = async () => {
            if (!nfts || nfts.length === 0) return;

            const results = await Promise.all(
                nfts.map(async (nft) => {
                    try {
                        const res = await fetch(nft.tokenURI);
                        const json = await res.json();
                        return { ...json, owner: nft.owner };
                    } catch (err) {
                        console.error("❌ 메타데이터 로드 실패:", nft.tokenURI);
                        return null;
                    }
                })
            );

            setMetadataList(
                results.filter((meta): meta is NFTMetadata & { owner: string } => !!meta)
            );
        };

        fetchMetadata();
    }, [nfts]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-400 mb-6">📦 Explorer</h1>
            <p className="mb-4 text-gray-400">총 민팅된 NFT: {total?.toString()}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {metadataList.map((nft, idx) => (
                    <div key={idx} className="bg-[#222] rounded-xl p-4 shadow-lg w-full max-w-sm">
                        <div className="w-full bg-black rounded-lg overflow-hidden mb-4 flex justify-center items-center">
                            <img
                                src={nft.image}
                                alt={nft.name}
                                className="object-contain max-h-[300px] w-auto"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-white">{nft.name}</h2>
                        <p className="text-sm text-gray-400">{nft.description}</p>
                        <p className="text-xs text-gray-500 mt-2 break-all">👤 Owner: {nft.owner}</p>
                    </div>
                ))}
            </div>




        </div>
    );
}
