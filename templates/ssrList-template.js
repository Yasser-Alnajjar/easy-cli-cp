export function ssrListTemplate(componentName, listName) {
  return `import React from "react";
import { ${listName}List } from "../csr";

export const ${componentName} = async () => {
  return (
    <${listName}List
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
      title: "${componentName}", 
      desc: "${componentName}" 
      }}
    />
  );
};
`;
}
