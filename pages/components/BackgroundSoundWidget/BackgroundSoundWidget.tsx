import React, { FC, useEffect, useState } from "react";
import { PauseButton } from "../PauseButton";
import { PlayButton } from "../PlayButton";

type Props = {};

export const BackgroundSoundWidget: FC<Props> = (props) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!play) return;

    const AudioContext = ((window as any).webkitAudioContext ||
      window.AudioContext) as typeof window.AudioContext;
    let audioContext = new AudioContext();

    let bufferSize = 4096;

    let lastOut = 0.0;
    let brownNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    brownNoise.onaudioprocess = function (e) {
      let output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        let white = Math.random() * 2.0 - 1.0;
        output[i] = (lastOut + 0.01 * white) / 1.005;
        lastOut = output[i];
        output[i] *= 3.0; // (roughly) compensate for gain
      }
    };

    let brownGain = audioContext.createGain();
    brownGain.gain.value = 0.3;
    brownNoise.connect(brownGain);
    brownGain.connect(audioContext.destination);

    return () => {
      brownNoise.disconnect();
      audioContext.close();
    };
  }, [play]);

  return (
    <>
      <div className="BackgroundSoundWidget">
        <div className="header">
          <div className="name">Brown noise</div>
          <div className="note">Ideal for concentration</div>
        </div>
        {play ? (
          <PauseButton onClick={() => setPlay(false)} />
        ) : (
          <PlayButton onClick={() => setPlay(true)} />
        )}
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
