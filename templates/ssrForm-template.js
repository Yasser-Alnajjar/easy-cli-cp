export function ssrFormTemplate(componentName) {
  return `import React from "react";
import { ${componentName}Form } from "../csr";
import { fetchData } from "@lib/client";

export const ${componentName} = async ({ id }: { id: string }) => {
  const user = await fetchData({
    url: \`/users/\${id}\`
    enabled: Boolean(id)
  });

  return <${componentName}Form data={user} />;
};

`;
}
