export function pageTemplate(typescript, name, componentName, module) {
  const upperModule = module.toUpperCase();

  if (typescript) {
    return typescriptTemp(name, componentName, upperModule);
  } else {
    return `
  import React from "react";
import {${upperModule}} from "@modules";
  const page = () => {
  return <${upperModule}.${componentName}/>
};

export default page;`;
  }
}
function typescriptTemp(name, componentName, module) {
  return `
import React from "react";
import {${module}} from "@modules";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "${name}",
};

const page = () => {
  return <${module}.${componentName}/>
};

export default page;`;
}
