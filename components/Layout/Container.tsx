import classNames from "classnames";
import React, { FC } from "react";

type Props = {
  className?: string;
};

export const Container: FC<Props> = (props) => {
  return (
    <>
      <div className={classNames("Container", props.className)}>
        <div className="inner">{props.children}</div>
      </div>

      <style jsx>{`
        .Container {
          display: flex;
          justify-content: center;
        }

        .inner {
          display: flex;
          max-width: var(--size-16);
          flex-grow: 1;
        }
      `}</style>
    </>
  );
};
