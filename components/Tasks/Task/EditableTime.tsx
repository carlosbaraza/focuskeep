import React, { FC, useState } from "react";
import { formatTime } from "./Timer";

type Props = {
  time: number; // seconds
  onChange(time: number): void;
};

export const EditableTime: FC<Props> = ({ time, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const minutesInitial = Math.floor(time / 60);
  const [minutes, setMinutes] = useState<string>(minutesInitial.toString());

  const onSubmit = () => {
    const parsedMinutes = parseInt(minutes);
    if (parsedMinutes) {
      onChange(parsedMinutes * 60);
    }
  };

  return (
    <>
      <div className="EditableTime">
        {isEditing ? (
          <input
            type="text"
            value={minutes}
            onChange={(e) => {
              setMinutes(e.target.value);
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
                setIsEditing(false);
              }
            }}
            onBlur={() => {
              onSubmit();
              setIsEditing(false);
            }}
          />
        ) : (
          <span
            onClick={() => {
              setIsEditing(true);
            }}
          >
            {formatTime(time)}
          </span>
        )}
      </div>

      <style jsx>{`
        .EditableTime {
          background: transparent;
          display: inline-flex;
        }

        input {
          background: transparent;
          display: inline-block;
          width: 3em;
          align-items: center;
          text-align: center;
        }
      `}</style>
    </>
  );
};
