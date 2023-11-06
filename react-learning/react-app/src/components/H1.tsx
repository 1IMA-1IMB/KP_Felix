import React from "react";

interface Props {
  children: string;
}

const H1 = ({ children }: Props) => {
  return <h1 className="h1h">{children}</h1>;
};

export default H1;
