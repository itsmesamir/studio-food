import React from "react";
import classNames from "clsx";

interface LoadingProps {
  className?: string;
  hasBackground?: boolean;
  size?: string;
}

function Loading(props: LoadingProps) {
  const { className, hasBackground, size = "md" } = props;

  return (
    <div
      className={classNames(" bg-white", className, {
        "flex justify-center items-center min-h-300 min-w-full bg-white md:min-h-[calc(100vh - 126px)] relative":
          hasBackground,
      })}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default Loading;
