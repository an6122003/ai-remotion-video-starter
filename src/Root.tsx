import "./index.css";
import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import { M5Comparison, M5ComparisonShorts } from "./projects/m5-comparison";
import { MimoIntelligence, TokenUsage } from "./projects/0505";
import {
  ExploitChain,
  MemoryIntegrityEnforcement,
  PrivilegeEscalation,
} from "./projects/mie";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Folder name="MacBook-Comparisons">
        <Composition
          id="M5-GPU-Comparison"
          component={M5Comparison}
          durationInFrames={300}
          fps={30}
          width={1280}
          height={720}
        />
        <Composition
          id="M5-GPU-Comparison-Shorts"
          component={M5ComparisonShorts}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="0505-Xiaomi">
        <Composition
          id="Mimo-Intelligence"
          component={MimoIntelligence}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Token-Usage"
          component={TokenUsage}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Apple-Security">
        <Composition
          id="Memory-Integrity-Enforcement"
          component={MemoryIntegrityEnforcement}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Exploit-Chain"
          component={ExploitChain}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Privilege-Escalation"
          component={PrivilegeEscalation}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
