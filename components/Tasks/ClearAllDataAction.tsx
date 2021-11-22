import React, { FC } from "react";
import { FaTrash } from "react-icons/fa";

type Props = {};

export const ClearAllDataAction: FC<Props> = (props) => {
  return (
    <>
      <div className="ClearAllDataAction">
        <a
          onClick={() => {
            const confirm = window.confirm("Do you want to delete all the data?");
            if (confirm) {
              window.localStorage.clear();
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
