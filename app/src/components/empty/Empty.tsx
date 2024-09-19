import React from "react";
import classNames from "clsx";

import { CiDatabase } from "react-icons/ci";

// import { empty } from "assets/images";

export interface EmptyProps {
  message: string;
  icon?: JSX.Element;
  className?: string;
  trailing?: JSX.Element | null;
  emptyTextClassName?: string;
}

function Empty(props: EmptyProps) {
  const { icon, message, className, trailing, emptyTextClassName } = props;

  return (
    <div
      className={classNames(
        "justify-center items-center flex h-full w-full flex-col bg-white py-12",
        className
      )}
    >
      <CiDatabase size={30} />
      {/* {icon ? (
        <div className="center">{icon}</div>
      ) : (
        <div className="mb-6 h-24 w-52">
          <img src={empty} alt="Empty Data" />
        </div>
      )} */}

      <p
        className={classNames(emptyTextClassName, {
          "text-lg font-semibold text-gray-60 ": !emptyTextClassName,
        })}
      >
        {message as string}
      </p>

      {trailing}
    </div>
  );
}

export default Empty;
