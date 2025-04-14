import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Ghost } from "lucide-react";
import Image from "next/image";
import ConnectWallet from "@/components/ConnectWallet";

export default function MagicianJaeNFT() {
    return (
        <div className="w-full bg-gradient-to-b from-[#121212] to-[#1e1e1e] text-white font-sans p-6 py-20">
            <header className="text-center py-10">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">Jae NFT</h1>
                <p className="text-gray-300 max-w-xl mx-auto text-lg">
                    정치와 마법의 경계에서 정의를 외치는 한 남자, 이재명을 모티브로 한 NFT 컬렉션
                </p>
            </header>

            <section className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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

                        <div className="mt-auto">
                            <a
                                href="https://testnets.opensea.io/assets/baobab/0x5e3a0cc6f8b4e8d1d1e1bd55408161cbf1c3748e/2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="secondary" className="bg-blue-600 hover:bg-blue-500 w-full">
                                    OpenSea에서 보기
                                </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>


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

                        <div className="mt-auto">
                            <a
                                href="https://testnets.opensea.io/assets/baobab/0x5e3a0cc6f8b4e8d1d1e1bd55408161cbf1c3748e/3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="ghost" className="bg-red-600 hover:bg-red-500 w-full">
                                    OpenSea에서 보기
                                </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>

            </section>

            <section className="mt-16 max-w-xl mx-auto text-center">
                <h2 className="text-xl font-semibold mb-2">지갑 연결하기</h2>
                <p className="text-gray-400 mb-4">NFT를 구매하거나 민팅하려면 지갑을 연결해주세요.</p>
                <ConnectWallet />
            </section>

            <section className="mt-20 text-center text-sm text-gray-500">
                <p>언어: <span className="font-semibold">한국어</span> / <span className="underline cursor-pointer">English</span></p>
            </section>

            <footer className="text-center text-gray-500 mt-10 text-sm">
                &copy; 2025 Magician Jae NFT Project — 평등과 개혁의 마법을 믿는 이들을 위해
            </footer>

        </div>

    );
}

