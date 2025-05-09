// src/lib/useExplorerNFTs.ts
"use client";

import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import JaeNFT from "@/lib/abi/JaeNFT.json";
import { readContract } from "wagmi/actions";
import { config } from "@/wagmi.config";

const CONTRACT_ADDRESS = "0x115d68EC326A8943A3B08d2a6Cf59d9A54Cbd7a5";
const abi = (JaeNFT as { abi: any }).abi;

interface NFTData {
    tokenId: number;
    tokenURI: string;
    owner: string;
}

export function useExplorerNFTs() {
    const [nfts, setNfts] = useState<NFTData[]>([]);

    const { data: totalSupply } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "totalSupply",
    });

    useEffect(() => {
        const fetchAll = async () => {
            if (!totalSupply) return;
            const results: NFTData[] = [];

            for (let i = 0; i < Number(totalSupply); i++) {
                try {
                    const tokenId = await readContract(config, {
                        address: CONTRACT_ADDRESS,
                        abi,
                        functionName: "tokenByIndex",
                        args: [i],
                    });

                    const tokenURI = await readContract(config, {
                        address: CONTRACT_ADDRESS,
                        abi,
                        functionName: "tokenURI",
                        args: [tokenId as bigint],
                    });

                    const owner = await readContract(config, {
                        address: CONTRACT_ADDRESS,
                        abi,
                        functionName: "ownerOf",
                        args: [tokenId as bigint],
                    });

                    results.push({
                        tokenId: Number(tokenId),
                        tokenURI: tokenURI as string,
                        owner: owner as string,
                    });
                } catch (err) {
                    console.error("❌ NFT 정보 불러오기 실패:", err);
                }
            }

            setNfts(results);
        };

        fetchAll();
    }, [totalSupply]);

    return {
        nfts,
        total: totalSupply || 0,
    };
}
