import { pascalCaseWithSpace } from "../utils/utils.js";

export function ssrListTemplate(componentName) {
  return `import React from "react";
import { ${componentName}List } from "../csr";

export const ${componentName} = async () => {
  return (
    <${componentName}List
      data={[]}
      columns={[
        {
          key: "firstName",
          label: "firstName",
          sortable: true,
          filterable: true,
        },
        {
          key: "lastName",
          label: "lastName",
          sortable: true,
          filterable: true,
        },
      ]}
      infos={{ 
      title: "${pascalCaseWithSpace(componentName)}", 
      desc: "${pascalCaseWithSpace(componentName)}" 
      }}
    />
  );
};
`;
}
