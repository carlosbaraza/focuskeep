import React, { FC, useEffect, useRef, useState } from "react";
import { PauseButton } from "../PauseButton";
import { PlayButton } from "../PlayButton";

type Props = {};

// random-noise-processor.js
const randomNoiseProcessor = `
let lastOut = 0.0;

class RandomNoiseProcessor extends AudioWorkletProcessor {
  process (inputs, outputs, parameters) {
    const output = outputs[0]
    output.forEach(channel => {
      for (let i = 0; i < channel.length; i++) {
        let white = Math.random() * 2.0 - 1.0;
        // brown noise
        channel[i] = (lastOut + 0.01 * white) / 1.005;
        lastOut = channel[i];
        channel[i] *= 3.0; // (roughly) compensate for gain
      }
    })
    return true
  }
}

registerProcessor('random-noise-processor', RandomNoiseProcessor)
`;

export const BackgroundSoundWidget: FC<Props> = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  let audioContextRef = useRef<AudioContext | null>(null);

  async function play() {
    if (typeof window === "undefined") return;
    if (isPlaying) return;
    setIsPlaying(true);

    const AudioContext = ((window as any).webkitAudioContext ||
      window.AudioContext) as typeof window.AudioContext;

    let audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    await audioContext.resume();

    const blob = new Blob([randomNoiseProcessor], { type: "application/javascript" });
    var url = URL.createObjectURL(blob);
    await audioContext.audioWorklet.addModule(url);

    let randomNoiseNode = new AudioWorkletNode(audioContext, "random-noise-processor");
    let brownGain = audioContext.createGain();
    brownGain.gain.value = 0.3;
    randomNoiseNode.connect(brownGain);
    brownGain.connect(audioContext.destination);
  }

  async function pause() {
    if (!isPlaying) return;
    setIsPlaying(false);
    audioContextRef.current?.close();
  }

  useEffect(() => {
    return () => {
      audioContextRef.current?.state !== "closed" && audioContextRef.current?.close();
    };
  }, []);

  return (
    <>
      <div className="BackgroundSoundWidget">
        <div className="header">
          <div className="name">Brown noise</div>
          <div className="note">Ideal for concentration</div>
        </div>
        {isPlaying ? <PauseButton onClick={pause} /> : <PlayButton onClick={play} />}
      </div>

      <style jsx>{`
        .BackgroundSoundWidget {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--size-05);
          border-radius: var(--border-radius-4);
          background: var(--white);
          box-shadow: var(--box-shadow-2);
        }

        .name {
          font-weight: var(--font-weight-bold);
          color: var(--gray-500);
        }

        .note {
          font-size: var(--font-size-1);
          line-height: var(--line-height-1);
          color: var(--gray-400);
        }
      `}</style>
    </>
  );
};
