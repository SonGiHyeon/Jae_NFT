// src/lib/useExplorerNFTs.ts
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import JaeNFT from "@/lib/abi/JaeNFT.json";
import { readContract } from "wagmi/actions"; // ✅ 이걸 꼭 추가!
import { config } from '@/wagmi.config'

const CONTRACT_ADDRESS = "0x115d68EC326A8943A3B08d2a6Cf59d9A54Cbd7a5"; // 새로 배포한 주소로 바꿔줘
const abi = (JaeNFT as { abi: any }).abi;

export function useExplorerNFTs() {
    const [tokenURIs, setTokenURIs] = useState<string[]>([]);

    // Step 1: totalSupply 가져오기
    const { data: totalSupply } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "totalSupply",
    });

    useEffect(() => {
        const fetchAllURIs = async () => {
            if (!totalSupply) return;
            const promises = [];

            for (let i = 0; i < Number(totalSupply); i++) {
                promises.push(
                    fetchTokenURI(i)
                );
            }

            const uris = await Promise.all(promises);
            setTokenURIs(uris);
        };

        fetchAllURIs();
    }, [totalSupply]);

    const fetchTokenURI = async (index: number) => {
        const tokenId = await readContract(config, {
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "tokenByIndex",
            args: [index],
        });

        const tokenURI = await readContract(config, {
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "tokenURI",
            args: [tokenId as bigint],
        });

        return tokenURI as string;
    };


    return {
        tokenURIs,
        total: totalSupply || 0,
    };
}
