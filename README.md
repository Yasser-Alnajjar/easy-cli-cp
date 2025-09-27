# easy-cli-cp

easy-cli-cp is a lightweight CLI tool to quickly scaffold React components, Next.js pages, lists, and forms without writing boilerplate manually.

## Technologies

- commander
- inquirer
- colorette
- fs/promises

## Features

- [x] Generate React components
- [x] Generate Next.js pages
- [x] Generate List components
- [x] Generate Form components
- [x] Fully TypeScript-ready templates
- [x] Ask user for target path

## Installation

```bash
npm i easy-cli-cp
```

## Usage

### 1. Generate a Page

```bash
ecp p <page-name>
# or
ecp page <page-name>
```

- Will ask for the **path** where you want to create the page.
- Creates a Next.js page file with a basic template.

### 2. Generate a List Component

```bash
ecp l <list-name>
# or
ecp list <list-name>
```

- Will ask for the **path** where you want to create the list component.
- Checks if any file with `List` in its name already exists.
- Generates a ready-to-use DataTable list component.

### 3. Generate a Form Component

```bash
ecp f <form-name>
# or
ecp form <form-name>
```

- Will ask for the **path** where you want to create the form component.
- Checks if any file with `Form` in its name already exists.
- Generates a ready-to-use Form component using Formik and DynamicForm.
