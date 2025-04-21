// src/lib/useMintNFT.ts
"use client";

import {
    useAccount,
    useSimulateContract,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { useEffect, useState } from "react";
import JaeNFT from "@/lib/abi/JaeNFT.json";
import { switchChain } from "@wagmi/core"; // wagmi/core 사용
import { config } from "@/wagmi.config";   // config도 꼭 가져와야 해

const CONTRACT_ADDRESS = "0x115d68EC326A8943A3B08d2a6Cf59d9A54Cbd7a5";
const abi = (JaeNFT as { abi: any }).abi;
const MINT_CHAIN_ID = 1001; // Baobab

export function useMintNFT() {
    const { address } = useAccount();
    const [pendingTokenURI, setPendingTokenURI] = useState<string | null>(null);
    const [resolvePromise, setResolvePromise] = useState<((result: boolean) => void) | null>(null);
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

    // 1. 시뮬레이션
    const {
        data: simulationResult,
        isSuccess: isSimulated,
        error: simulationError,
    } = useSimulateContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "mint",
        args: pendingTokenURI && address ? [address, pendingTokenURI] : undefined,
        query: {
            enabled: !!pendingTokenURI && !!address,
        },
    });

    // 2. 트랜잭션 전송
    const {
        writeContract,
        isPending: isWriting,
    } = useWriteContract({
        mutation: {
            onSuccess(txHash) {
                console.log("✅ 트랜잭션 전송 완료! 해시:", txHash);
                setTxHash(txHash);
            },
            onError(error) {
                console.error("❌ 트랜잭션 전송 실패:", error);
                alert("❌ 트랜잭션 전송 실패");
                setPendingTokenURI(null);
                resolvePromise?.(false);
            },
        },
    });

    // 3. 트랜잭션 확정 확인
    const {
        data: receipt,
        isLoading: isConfirming,
        isSuccess: isConfirmed,
    } = useWaitForTransactionReceipt({
        hash: txHash,
    });

    // 민팅 실행 함수
    const mintNFT = async (tokenURI: string): Promise<boolean> => {
        console.log("🧙‍♂️ mintNFT called with:", tokenURI);
        if (!address) {
            alert("🦊 지갑을 먼저 연결해주세요!");
            return false;
        }

        try {
            // 체인이 다르면 전환 시도
            const currentChainId = await window.ethereum?.request({ method: "eth_chainId" });
            if (parseInt(currentChainId, 16) !== MINT_CHAIN_ID) {
                console.log("🔁 체인 전환 시도 중...");
                await switchChain(config, { chainId: MINT_CHAIN_ID });
                console.log("✅ 체인 전환 성공");
            }
        } catch (error) {
            console.error("❌ 체인 전환 실패:", error);
            alert("🛠️ Klaytn Baobab 체인으로 전환해주세요.");
            return false;
        }

        return new Promise((resolve) => {
            setResolvePromise(() => resolve);
            setPendingTokenURI(tokenURI);
        });
    };

    // 4. 시뮬레이션 성공 시 트랜잭션 실행
    useEffect(() => {
        if (isSimulated && simulationResult?.request) {
            console.log("🚀 시뮬레이션 성공. 트랜잭션 전송 준비됨");
            try {
                writeContract(simulationResult.request);
            } catch (err) {
                console.error("❌ 트랜잭션 전송 중 오류:", err);
            }
        }
    }, [isSimulated, simulationResult, writeContract]);

    // 5. 트랜잭션 확정 시
    useEffect(() => {
        if (isConfirmed && receipt?.status === "success") {
            console.log("✅ 민팅 성공! 트랜잭션 해시:", receipt.transactionHash);
            alert("✅ 민팅 성공!");
            setPendingTokenURI(null);
            resolvePromise?.(true);
        }
    }, [isConfirmed, receipt, resolvePromise]);

    // 6. 시뮬레이션 에러
    useEffect(() => {
        if (simulationError) {
            console.error("❌ 민팅 시뮬레이션 실패:", simulationError.message);
            alert("❌ 민팅 실패: 시뮬레이션 오류");
            setPendingTokenURI(null);
            resolvePromise?.(false);
        }
    }, [simulationError, resolvePromise]);

    return {
        mintNFT,
        isPending: isWriting || isConfirming,
        isConfirmed,
        txHash,
        error: simulationError,
    };
}
