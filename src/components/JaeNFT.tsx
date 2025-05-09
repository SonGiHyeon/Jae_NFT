"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Ghost } from "lucide-react";
import Image from "next/image";
import ConnectWallet from "@/components/ConnectWallet";
import { useAccount } from "wagmi";
import { useMintNFT } from "../lib/useMIntNFT"

export default function JaeNFT() {
    const { address } = useAccount();
    const { mintNFT, isPending, isConfirmed, txHash } = useMintNFT();

    const magicianURI =
        "https://magenta-wrong-sloth-298.mypinata.cloud/ipfs/QmaLSYUkPzyBHEpkqLhfYAJCBoCDWX4kbfx8F9bP9UQoRF";
    const assassinURI =
        "https://magenta-wrong-sloth-298.mypinata.cloud/ipfs/QmNRnAxQ9ibiVExRDKnCzanC4mo7bgxPNXD5ZH9eUXgL3v";

    const handleMint = async (uri: string) => {
        if (!address) {
            alert("🦊 지갑을 먼저 연결해주세요!");
            return;
        }

        const success = await mintNFT(uri);
        if (success) {
        } else {
            alert("❌ 민팅 실패!");
        }

    };

    return (
        <div className="w-full bg-gradient-to-b from-[#121212] to-[#1e1e1e] text-white font-sans p-6 py-20">
            <header className="text-center py-10">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">Jae NFT</h1>
                <p className="text-gray-300 max-w-xl mx-auto text-lg">
                    정치와 마법의 경계에서 정의를 외치는 한 남자, 이재명을 모티브로 한 NFT 컬렉션
                </p>
            </header>

            <section className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* Magician Jae */}
                <Card className="bg-[#222] border border-blue-600 shadow-lg flex flex-col justify-between">
                    <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,200,255,0.6)] mb-4">
                            <Image
                                src="/images/Magician_Jae.jpeg"
                                alt="Magician Jae"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <Sparkles className="text-blue-400" />
                            <h2 className="text-2xl font-semibold">Magician Jae</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            마법과 지혜를 상징하는 마법사 Jae. 정의의 서와 룬 스태프로 혼돈에 질서를 부여합니다.
                        </p>
                        <div className="flex flex-col gap-2 mt-auto">
                            <Button
                                onClick={() => handleMint(magicianURI)}
                                disabled={isPending}
                                className="bg-purple-600 hover:bg-purple-500 w-full"
                            >
                                {isPending ? "민팅 중..." : "Magician Jae 민팅하기"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Assassin Jae */}
                <Card className="bg-[#222] border border-red-600 shadow-lg flex flex-col justify-between">
                    <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] hover:contrast-125 mb-4">
                            <Image
                                src="/images/Assassin_Jae.jpeg"
                                alt="Assassin Jae"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <Ghost className="text-gray-400" />
                            <h2 className="text-2xl font-semibold">Assassin Jae</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            그림자 속 정의의 집행자 Jae. 은밀한 칼날로 권력의 어둠을 가릅니다.
                        </p>
                        <div className="flex flex-col gap-2 mt-auto">
                            <Button
                                onClick={() => handleMint(assassinURI)}
                                disabled={isPending}
                                className="bg-red-600 hover:bg-red-500 w-full"
                            >
                                {isPending ? "민팅 중..." : "Assassin Jae 민팅하기"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="mt-16 max-w-xl mx-auto text-center">
                <h2 className="text-xl font-semibold mb-2">지갑 연결하기</h2>
                <p className="text-gray-400 mb-4">NFT를 구매하거나 민팅하려면 지갑을 연결해주세요.</p>
                <ConnectWallet />
                {txHash && isConfirmed && (
                    <p className="text-green-400 mt-4 text-sm break-words">
                        ✅ 민팅 완료! Tx:{" "}
                        <a
                            className="underline"
                            href={`https://baobab.scope.klaytn.com/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {txHash}
                        </a>
                    </p>
                )}
            </section>

            <footer className="text-center text-gray-500 mt-10 text-sm">
                &copy; 2025 Magician Jae NFT Project — 평등과 개혁의 마법을 믿는 이들을 위해
            </footer>
        </div>
    );
}