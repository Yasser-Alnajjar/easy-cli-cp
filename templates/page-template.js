import { capitalize } from "../utils/utils.js";

export function pageTemplate(typescript, name) {
  if (typescript) {
    return typescriptTemp(name);
  } else {
    return `
  import React from "react";
  const page = () => {
  return <div>${capitalize(name)}</div>
};

export default page;`;
  }
}
function typescriptTemp(name) {
  return `
import React from "react";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "${name}",
};

const page = () => {
  return <div>${capitalize(name)}</div>
};

export default page;`;
}
