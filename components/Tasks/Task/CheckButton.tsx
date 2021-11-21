import classNames from "classnames";
import React, { FC } from "react";
import { FaCheck, FaRedo } from "react-icons/fa";

type Props = {
  checked: boolean;
  onComplete(): void;
  onReset(): void;
};

export const CheckButton: FC<Props> = ({ checked, onComplete, onReset }) => {
  return (
    <>
      <button
        className={classNames("CheckButton", {
          checked,
        })}
        onClick={() => {
          if (checked) {
            onReset();
          } else {
            onComplete();
          }
        }}
      >
        <span className="reset">
          <FaRedo />
        </span>
        <FaCheck />
      </button>

      <style jsx>{`
        .CheckButton {
          position: relative;
          background: var(--gray-200);
          color: var(--gray-400);
          padding: var(--size-03);
          border-radius: var(--border-radius-full);
          width: var(--size-07);
          height: var(--size-07);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checked {
          background: var(--gray-800);
          color: var(--white);
        }

        .reset {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gray-800);
          color: var(--white);
          border-radius: var(--border-radius-full);
          transition: var(--transition-all);
          opacity: 0;
        }

        .checked:hover .reset {
          opacity: 1;
        }
      `}</style>
    </>
  );
};
