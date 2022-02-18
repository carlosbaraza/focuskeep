import React, { FC } from "react";
import { BackgroundSoundWidget } from "./BackgroundSoundWidget/BackgroundSoundWidget";
import { HowToUse } from "./HowToUse";

type Props = {};

export const Sidebar: FC<Props> = (props) => {
  return (
    <>
      <div className="Sidebar">
        <BackgroundSoundWidget />
        <HowToUse />
      </div>

      <style jsx>{`
        .Sidebar {
          width: 100%;
        }

        .Sidebar > :global(* + *) {
          margin-top: var(--size-05);
        }

        @media (min-width: 768px) {
          .Sidebar {
            width: var(--size-13);
          }
        }
      `}</style>
    </>
  );
};
