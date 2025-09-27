export function formPageTemplate(typescript, name, componentName, module) {
  const upperModule = module.toUpperCase();
  if (typescript) {
    return typescriptTemp(name, componentName, upperModule);
  } else {
    return ` 
import React from "react";
import {${upperModule}} from "@modules";
export const metadata = {
  title: "${name}",
};

const page = async ({ searchParams }) => {
  const id = (await searchParams).id; 
  return <${upperModule}.${componentName} id={id} />;
};

export default page;
`;
  }
}

function typescriptTemp(name, componentName, module) {
  return `

import React from "react";
import { Metadata } from "next";
import {${module}} from "@modules";

export const metadata: Metadata = {
  title: "${name}",
};

const page = async ({ searchParams }: { searchParams: Promise<any> }) => {
  const id = (await searchParams).id;
  return <${module}.${componentName} id={id} />;
};

export default page;
`;
}
