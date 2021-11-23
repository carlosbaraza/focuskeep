import classNames from "classnames";
import React, { FC, ReactNode } from "react";

type Props = {
  progress: number;
  size?: number;
  stroke?: number;
  strokeColor?: string;
  backgroundColor?: string;
};

export const getLogoProgressSvg = ({
  progress,
  size = 32,
  stroke = 4,
  strokeColor = "#54565a",
  backgroundColor = "#E5E7EB",
}: Props): string => {
  var radius = 32 / 2 - stroke / 2 - stroke;
  var circumference = radius * 2 * Math.PI;

  const offset = circumference - (progress / 100) * circumference;

  return `<svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="${size}"
    height="${size}"
    viewBox="0 0 32 32"
  >
    <circle
      stroke="transparent"
      strokeWidth="0"
      fill="${backgroundColor}"
      r="16"
      cx="16"
      cy="16"
    />
    <circle
      stroke-dasharray="${circumference} ${circumference}"
      stroke-dashoffset="${offset}"
      stroke="${strokeColor}"
      stroke-width="${stroke}"
      fill="transparent"
      r="${16 - stroke / 2 - stroke}"
      cx="16"
      cy="16"
      transform="rotate(-90 16 16)"
    />
    <path
      fill="${strokeColor}"
      transform="scale(0.09) translate(110 140)"
      d="M48.18,61.81a11.19,11.19,0,0,1,1-1.27q29-29.05,58.07-58.08c3.26-3.26,6.73-3.28,10,0q4.14,4.13,8.27,8.27c2.93,3,2.94,6.54,0,9.49Q89,56.59,52.62,93c-2.93,2.93-6.56,2.92-9.51,0Q22.67,72.55,2.23,52.1c-3-3-3-6.55,0-9.59l8.46-8.46c2.88-2.86,6.52-2.89,9.4,0q13.27,13.23,26.5,26.5a10.15,10.15,0,0,1,.94,1.29Z"
    />
  </svg>`;
};

export const LogoProgress: FC<Props> = ({
  progress,
  size = 32,
  stroke = 4,
  strokeColor = "#54565a",
  backgroundColor = "#ffffff",
}) => {
  var radius = 32 / 2 - stroke / 2 - stroke;
  var circumference = radius * 2 * Math.PI;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div className={"LogoProgress"}>
        <svg
          className="progress-ring"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width={size}
          height={size}
          viewBox="0 0 32 32"
        >
          <circle
            stroke="transparent"
            strokeWidth="0"
            fill={backgroundColor}
            r="16px"
            cx="16px"
            cy="16px"
          />
          <circle
            style={{
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset: `${offset}`,
            }}
            className="progress-ring__circle"
            stroke={strokeColor}
            strokeWidth={stroke}
            fill={backgroundColor}
            r={16 - stroke / 2 - stroke}
            cx="16px"
            cy="16px"
          />
          <path
            fill={strokeColor}
            transform="scale(0.09) translate(110 140)"
            d="M48.18,61.81a11.19,11.19,0,0,1,1-1.27q29-29.05,58.07-58.08c3.26-3.26,6.73-3.28,10,0q4.14,4.13,8.27,8.27c2.93,3,2.94,6.54,0,9.49Q89,56.59,52.62,93c-2.93,2.93-6.56,2.92-9.51,0Q22.67,72.55,2.23,52.1c-3-3-3-6.55,0-9.59l8.46-8.46c2.88-2.86,6.52-2.89,9.4,0q13.27,13.23,26.5,26.5a10.15,10.15,0,0,1,.94,1.29Z"
          />
        </svg>
      </div>

      <style jsx>{`
        .LogoProgress {
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
