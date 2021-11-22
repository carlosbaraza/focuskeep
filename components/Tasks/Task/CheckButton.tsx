import classNames from "classnames";
import React, { FC } from "react";
import { FaCheck, FaRedo } from "react-icons/fa";
import { ProgressCircle } from "../../common/ProgressCircle";

type Props = {
  progress: number;
  checked: boolean;
  onComplete(): void;
  onReset(): void;
};

export const CheckButton: FC<Props> = ({ checked, progress, onComplete, onReset }) => {
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
        <ProgressCircle absolute progress={progress} strokeColor="#1f2937">
          <div className="inner">
            <span className="reset">
              <FaRedo />
            </span>
            <FaCheck />
          </div>
        </ProgressCircle>
      </button>

      <style jsx>{`
        .CheckButton {
          position: relative;
          color: var(--gray-400);
          width: var(--size-07);
          height: var(--size-07);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-transform);
          transform: scale(1);
        }

        .inner {
          border-radius: var(--border-radius-full);
          padding: var(--size-03);
          background: var(--gray-200);
          transition: var(--transition-all);
          transition-delay: var(--transition-delay-0);
        }

        .CheckButton:focus,
        .CheckButton:hover {
          outline: none;
          transform: scale(1.1);
        }

        .checked .inner {
          background: var(--gray-800);
          color: var(--white);
        }

        .reset {
          display: block;
          position: absolute;
          top: 2px;
          left: 2px;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
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
