export function listTemplate(componentName, baseUrl, namespace, module) {
  return `"use client";

import React from "react";
import {
  AddButton,
  DataTable,
  ExportButton,
  useBuildColumns,
} from "@components";
import { useRouter } from "@navigation";
import { useTranslate } from "@hooks";

export const ${componentName}List = ({
  data,
  columns,
  infos,
}: {
  data: any[];
  columns: any;
  infos: { title: string; desc: string };
}) => {
  const router = useRouter();
  const t = useTranslate("${module}");

  const baseUrl = "/${module}${baseUrl}";

  const parsedColumns = useBuildColumns<any>(columns);

  return (
    <div className="my-5">
      <DataTable
        columns={parsedColumns}
        data={data}
        onDelete={(ids) => console.log("bulk delete:", ids)}
        editLink={(data) => router.push(\`\${baseUrl}/form?id=\${data.id}\`)}
        empty={{
          title: infos.title,
          description: infos.desc,
          cta: t("${namespace}.add_new"),
          link: \`\${baseUrl}/form\`,
        }}
        header={({ table }) => (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 border border-gray-300/53 rounded-lg p-4 mb-2 shadow-md">
            <div className="flex flex-col gap-1 mb-2">
              <h1 className="text-lg font-medium">{infos.title}</h1>
              <p className="text-sm text-gray-600">{infos.desc}</p>
            </div>
            <div className="flex items-center gap-4">
              <ExportButton table={table} />
              <AddButton href={\`\${baseUrl}/form\`} />
            </div>
          </div>
        )}
      />
    </div>
  );
};`;
}
