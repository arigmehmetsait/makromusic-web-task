import React, { useEffect, useState } from "react";

export default function Alert({
  type = "warning",
  open,
  title = "",
  description = "",
  className,
  setOpen,
}) {
  const classNames = {
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
    error: "bg-error",
  };
  return (
    <div
      className={`${classNames[type]} ${
        open ? "" : "hidden"
      } min-w-[300px] justify-between flex w-min rounded-sm ${className}`}
    >
      <div className="ml-[15px] my-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            setOpen(false);
          }}
          className=" text-white font-senibold my-auto w-[40px] h-[30px] border-l-[1px] text-xl"
          type="transparent"
        >
          X
        </button>
      </div>
    </div>
  );
}
