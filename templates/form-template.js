export function formTemplate(componentName, namespace, module) {
  return `"use client";
import React from "react";
import { FormikHelpers } from "formik";
import { DynamicForm, IFieldGroup } from "@components";
import { useBuildYupSchema, useQueryParams, useTranslate } from "@hooks";

import type { ISchema } from "@hooks";

export const ${componentName}Form = ({ data }: { data: any }) => {
  const t = useTranslate("${module}");

  // === Basic Fields ===
  const fields: Array<ISchema> = [
    {
      name: "course_number",
      label: t("${namespace}.course_number"),
      type: "text",
      required: true,
      col: "lg:col-span-6",
    },
    {
      name: "course_status",
      label: t("${namespace}.course_status"),
      type: "select",
      options: [
        { label: "Option 1", value: "option-1" },
        { label: "Option 2", value: "option-2" },
        { label: "Option 3", value: "option-3" },
      ],
      required: true,
      col: "lg:col-span-6",
    },
    {
      name: "completion_date",
      label: t("${namespace}.completion_date"),
      type: "date",
      required: true,
      col: "lg:col-span-6",
    },
  ];

  const attachmentsField: ISchema = {
    name: "attachments",
    label: t("attachments"),
    type: "drop-file",
  };

  const groups: Array<IFieldGroup> = [
    { fields: fields },
    { fields: [attachmentsField] },
  ];

  const schema = useBuildYupSchema([...fields, attachmentsField]);
  const { getQueryObject } = useQueryParams();

  const onSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
    if (getQueryObject().id) {
      console.log("update job", values);
    } else {
      console.log("create job", values);
    }
    formikHelpers.resetForm();
  };

  return (
    <section className="container my-5">
      <div className="my-4 lg:my-8">
        <h2 className="text-3xl font-bold">{t("${namespace}.new_title")}</h2>
      </div>
      <DynamicForm
        data={data}
        groups={groups}
        schema={schema}
        onSubmit={onSubmit}
      />
    </section>
  );
};
`;
}
