"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Ghost, Shield } from "lucide-react";
import Image from "next/image";
import ConnectWallet from "@/components/ConnectWallet";
import { useAccount } from "wagmi";
import { useMintNFT } from "../lib/useMIntNFT";

export default function JaeNFT() {
    const { address } = useAccount();
    const { mintNFT, isPending, isConfirmed, txHash } = useMintNFT();

    const magicianURI =
        "https://magenta-wrong-sloth-298.mypinata.cloud/ipfs/QmaLSYUkPzyBHEpkqLhfYAJCBoCDWX4kbfx8F9bP9UQoRF";
    const assassinURI =
        "https://magenta-wrong-sloth-298.mypinata.cloud/ipfs/QmNRnAxQ9ibiVExRDKnCzanC4mo7bgxPNXD5ZH9eUXgL3v";
    const holyKnightURI =
        "https://gateway.pinata.cloud/ipfs/QmNVZKJefH4BCQT7bv8gVZNmPD2pxZd5SDhPfHkvaatcBB";
    const voodooURI = "https://gateway.pinata.cloud/ipfs/QmbQARt9YVEhsehJJ9beH76ngBEmPqzCrD4iANWjdix5qR";
    const BeastcallerURI = "https://gateway.pinata.cloud/ipfs/QmPeHeF3RLGB2ATq3HrtXpmEmxKzkh25miJLs8kXCd8bhu";

    const handleMint = async (uri: string) => {
        if (!address) {
            alert("🦊 지갑을 먼저 연결해주세요!");
            return;
        }

        const success = await mintNFT(uri);
        if (!success) {
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

            <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                        <Button
                            onClick={() => handleMint(magicianURI)}
                            disabled={isPending}
                            className="bg-purple-600 hover:bg-purple-500 w-full"
                        >
                            {isPending ? "민팅 중..." : "Magician Jae 민팅하기"}
                        </Button>
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
                        <Button
                            onClick={() => handleMint(assassinURI)}
                            disabled={isPending}
                            className="bg-red-600 hover:bg-red-500 w-full"
                        >
                            {isPending ? "민팅 중..." : "Assassin Jae 민팅하기"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Holy Knight Jae */}
                <Card className="bg-[#222] border border-yellow-500 shadow-lg flex flex-col justify-between">
                    <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,0,0.6)] mb-4">
                            <Image
                                src="/images/Holy_Knight_Jae.jpeg"
                                alt="Holy Knight Jae"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <Shield className="text-yellow-300" />
                            <h2 className="text-2xl font-semibold">Holy Knight Jae</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            정의와 빛의 기사 Jae. 말과 방패로 약자를 수호하며, 어둠을 밝히는 진실의 눈을 가졌습니다.
                        </p>
                        <Button
                            onClick={() => handleMint(holyKnightURI)}
                            disabled={isPending}
                            className="bg-yellow-600 hover:bg-yellow-500 w-full"
                        >
                            {isPending ? "민팅 중..." : "Holy Knight Jae 민팅하기"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Spiritbinder Jae */}
                <Card className="bg-[#222] border border-green-600 shadow-lg flex flex-col justify-between">
                    <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="relative w-full aspect-[4/5] bg-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[...] mb-4">
                            <Image
                                src="/images/Spiritbinder_Jae.jpeg"
                                alt="Spiritbinder Jae"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <Ghost className="text-green-400" />
                            <h2 className="text-2xl font-semibold">Spiritbinder Jae</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            부패한 자들의 희생이 된 영혼의 분노를 대변하는 이재명. 주술과 혼령의 힘으로 정의를 바로세우는 부두술사입니다.
                        </p>
                        <Button
                            onClick={() => handleMint(voodooURI)}
                            disabled={isPending}
                            className="bg-green-700 hover:bg-green-600 w-full"
                        >
                            {isPending ? "민팅 중..." : "Spiritbinder Jae 민팅하기"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Beastcaller Jae */}
                <Card className="bg-[#222] border border-indigo-600 shadow-lg flex flex-col justify-between">
                    <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] mb-4">
                            <Image
                                src="/images/Beastcaller_Jae.jpeg"
                                alt="Beastcaller Jae"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <Ghost className="text-indigo-400" />
                            <h2 className="text-2xl font-semibold">Beastcaller Jae</h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            고대의 야수와 정령을 조종하는 정치 조련사 Jae. 혼돈의 짐승 윤석렬을 길들여 정의의 도구로 바꾸려는 비스트마스터입니다.
                        </p>
                        <Button
                            onClick={() =>
                                handleMint(
                                    "https://gateway.pinata.cloud/ipfs/QmPeHeF3RLGB2ATq3HrtXpmEmxKzkh25miJLs8kXCd8bhu"
                                )
                            }
                            disabled={isPending}
                            className="bg-indigo-700 hover:bg-indigo-600 w-full"
                        >
                            {isPending ? "민팅 중..." : "Beastcaller Jae 민팅하기"}
                        </Button>
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
