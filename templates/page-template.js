export function pageTemplate(typescript, name, componentName) {
  if (typescript) {
    return typescriptTemp(name, componentName);
  } else {
    return `
  import React from "react";
  const page = () => {
  return <${componentName}/>
};

export default page;`;
  }
}
function typescriptTemp(name, componentName) {
  return `
import React from "react";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "${name}",
};

const page = () => {
  return <${componentName}/>
};

export default page;`;
}
