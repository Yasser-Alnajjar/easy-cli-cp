export function formPageTemplate(typescript, name, componentName) {
  if (typescript) {
    return typescriptTemp(name, componentName);
  } else {
    return ` 
import React from "react";

export const metadata = {
  title: "${name}",
};

const page = async ({ searchParams }) => {
  const id = (await searchParams).id;
  return <${componentName} id={id} />;
};

export default page;
`;
  }
}

function typescriptTemp(name, componentName) {
  return `

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${name}",
};

const page = async ({ searchParams }: { searchParams: Promise<any> }) => {
  const id = (await searchParams).id;
  return <${componentName} id={id} />;
};

export default page;
`;
}
