import React, { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { db } from "./db";

type Props = {};

export const ClearAllDataAction: FC<Props> = (props) => {
  return (
    <>
      <div className="ClearAllDataAction">
        <a
          onClick={() => {
            const confirm = window.confirm(
              "Do you want to delete all the data? This includes all the history from previous days. The data is stored in your browser, so only you have access to it."
            );
            if (confirm) {
              window.localStorage.clear();
              db.delete();
              window.location.reload();
            }
          }}
        >
          <FaTrash />
          <span>Clear all data</span>
        </a>
      </div>

      <style jsx>{`
        .ClearAllDataAction {
          color: var(--gray-300);
          cursor: pointer;
        }
        a {
          display: inline-flex;
          align-items: center;
        }
        a > :global(* + *) {
          margin-left: var(--size-02);
        }
      `}</style>
    </>
  );
};
