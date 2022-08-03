import { useEffect } from "react";

import { AlertData, ListData } from "./App";

type AlertProps = AlertData & {
  removeAlert: (
    show?: boolean,
    type?: "" | "success" | "danger",
    msg?: string
  ) => void;
  list: ListData[];
};

export function Alert({ msg, type, removeAlert, list }: AlertProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
}
