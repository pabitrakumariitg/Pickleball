import { Marquee } from "@/components/magicui/marquee";

export function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
            <Marquee pauseOnHover className="[--duration:25s] text-4xl font-bold tracking-wide whitespace-nowrap">
                <p className="mx-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-400/80 dark:text-gray-100">
                    Join the pickleball revolution in Nagaland. Your first game is just a click away
                </p> </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    );
}
