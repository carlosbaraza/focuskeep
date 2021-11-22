import classNames from "classnames";
import React, { FC, ReactNode } from "react";

type Props = {
  progress: number;
  children?: ReactNode;
  size?: number;
  stroke?: number;
  strokeColor?: string;
  backgroundColor?: string;
  absolute?: boolean;
};

export const ProgressCircle: FC<Props> = ({
  progress,
  children,
  size = 32,
  stroke = 4,
  strokeColor = "#4b5563",
  backgroundColor = "transparent",
  absolute,
}) => {
  var radius = size / 2 - stroke / 2;
  var circumference = radius * 2 * Math.PI;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div className={classNames("ProgressCircle", { absolute })}>
        <div className="overlay">
          <svg className="progress-ring" width={size} height={size}>
            <circle
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: `${offset}`,
              }}
              className="progress-ring__circle"
              stroke={strokeColor}
              strokeWidth={stroke}
              fill={backgroundColor}
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
          </svg>
        </div>

        {children}
      </div>

      <style jsx>{`
        .ProgressCircle {
          position: relative;
        }

        .progress-ring {
        }

        .absolute .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .progress-ring__circle {
          transition: 0.35s stroke-dashoffset;
          // axis compensation
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      `}</style>
    </>
  );
};
