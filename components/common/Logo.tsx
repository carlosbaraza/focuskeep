import React, { FC } from "react";
import { LogoProgress } from "./LogoProgress";
import { useLogoContext } from "./LogoProvider";

type Props = {};

export const Logo: FC<Props> = (props) => {
  const { progress } = useLogoContext();
  return (
    <>
      <div className="Logo">
        <LogoProgress progress={progress} size={32} />
        <span>FocusKeep</span>
      </div>

      <style jsx>{`
        .Logo {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: var(--font-size-4);
          line-height: var(--line-height-4);
          color: var(--gray-700);
        }

        .Logo > :global(* + *) {
          margin-left: var(--size-03);
        }
      `}</style>
    </>
  );
};
