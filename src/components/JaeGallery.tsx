// 아직 안쓰는 코드

'use client';

import Image from 'next/image';

export default function JaeGallery() {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl w-full">
                {/* Magician Jae */}
                <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,200,255,0.6)]">
                    <Image
                        src="/magician-jae.png"
                        alt="Magician Jae"
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Assassin Jae */}
                <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:contrast-125 hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                    <Image
                        src="/assassin-jae.png"
                        alt="Assassin Jae"
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
