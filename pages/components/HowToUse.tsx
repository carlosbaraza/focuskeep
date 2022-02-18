import React, { FC } from "react";

type Props = {};

export const HowToUse: FC<Props> = (props) => {
  return (
    <>
      <div className="HowToUse">
        <h2 className="header">How to use FocusKeep?</h2>
        <p className="note">
          FocusKeep is a tool that helps you focus on your tasks. First, you set blocks of focused
          time. Then you play the timer and you will get notified when the timer is up.
        </p>
        <p className="note">
          Focused time blocks have served me (
          <a href="https://twitter.com/carlosbaraza">@carlosbaraza</a>) well over the past few
          years.
        </p>
      </div>

      <style jsx>{`
        .HowToUse {
          display: flex;
          flex-direction: column;
          padding: var(--size-05);
          border-radius: var(--border-radius-4);
          background: var(--white);
          box-shadow: var(--box-shadow-2);
        }

        .HowToUse > :global(* + *) {
          margin-top: var(--size-03);
        }

        .header {
          font-weight: var(--font-weight-bold);
          color: var(--gray-500);
        }

        .note {
          font-size: var(--font-size-1);
          line-height: var(--line-height-1);
          color: var(--gray-400);
        }

        a {
          color: var(--yellow-600);
          font-weight: bold;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
