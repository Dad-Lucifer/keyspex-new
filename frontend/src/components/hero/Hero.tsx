import { HeroVisualStage } from "./HeroVisualStage";
import { HeroStatement } from "./HeroStatement";
import { HeroTicker } from "./HeroTicker";

export function Hero() {
  return (
    <div className="w-full bg-[#0a0a0f] overflow-x-hidden">
      <HeroVisualStage />
      <HeroStatement />
      <HeroTicker />
    </div>
  );
}
