export function formTemplate(componentName, namespace = "common") {
  return `"use client";
import React from "react";
import { FormikHelpers } from "formik";
import { DynamicForm, IFieldGroup } from "@components";
import { useBuildYupSchema, useQueryParams, useTranslate } from "@hooks";

import type { ISchema } from "@hooks";

export const ${componentName}Form = ({ data }: { data: any }) => {
  const t = useTranslate("${namespace}");

  // === Basic Fields ===
  const fields: Array<ISchema> = [
    {
      name: "risk_type",
      label: t("${namespace}.risk_type"),
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
      name: "risk_level",
      label: t("${namespace}.risk_level"),
      type: "text",
      required: true,
      col: "lg:col-span-6",
    },
  ];

  const descriptionField: ISchema = {
    name: "mitigation_plan",
    label: t("${namespace}.mitigation_plan"),
    type: "textarea",
  };

  const attachmentsField: ISchema = {
    name: "attachments",
    label: t("attachments"),
    type: "drop-file",
  };

  const groups: Array<IFieldGroup> = [
    { fields: fields },
    { fields: [descriptionField] },
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
