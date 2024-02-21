## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment Check

The application includes a GitHub Actions workflow for Next.js deployment checks. This workflow ensures that the production build of the application is optimized and ready for deployment.

When you push changes to the main branch, GitHub Actions will automatically run the deployment check workflow, which includes building the Next.js app and performing any specified checks.

## Pre-commit Hook and Linting

This project is configured to use a pre-commit hook powered by Husky and lint-staged. Before each commit, lint-staged runs Prettier to ensure consistent code formatting.

To ensure your code adheres to the project's formatting standards, Prettier automatically formats your code according to the project's configuration. This happens automatically before each commit due to the pre-commit hook setup.

However, if you need to format your code manually, you can do so by running the following command in your terminal:
` npx prettier --write .`

This command formats all files in the project directory according to the Prettier configuration.

Remember to run this command before submitting your pull request to ensure consistent code formatting across the project.

For more information about Prettier and its benefits, visit the official [website](https://prettier.io/).

## Color pallete

#### Modern Color Palette:

![Crimson](https://via.placeholder.com/150x50/DC143C/000000?text=+) `#DC143C` (RGB: 220, 20, 60)

` Use for critical alerts or errors, such as when there's a problem with saving data or when there's an error in the user's input. Highlight important notifications, etc.`

![Dark Gray](https://via.placeholder.com/150x50/2F4F4F/000000?text=+) `#2F4F4F` (RGB: 47, 79, 79)

` Borders, Seperators to organize page / Use aganst darker background`

![Goldenrod](https://via.placeholder.com/150x50/DAA520/000000?text=+) `#DAA520` (RGB: 218, 165, 32)

`Highlight achievements or milestones, such as reaching a personal best or completing a goal`

![Green](https://via.placeholder.com/150x50/008000/000000?text=+) `#008000` (RGB: 0, 128, 0)

` Success messages (achieved a goal) / highlight positive achievement`

![Imperial Blue](https://via.placeholder.com/150x50/003366/000000?text=+) `#003366` (RGB: 0, 51, 102)

`Headings / titles`

![Navy Blue](https://via.placeholder.com/150x50/000080/000000?text=+) `#000080` (RGB: 0, 0, 128)

` Navigational Elements`

![Royal Purple](https://via.placeholder.com/150x50/6A0DAD/000000?text=+) `#6A0DAD` (RGB: 106, 13, 173)

` Decrotive elements and accents to add visual intrest`

![Slate Gray](https://via.placeholder.com/150x50/708090/000000?text=+) `#708090` (RGB: 112, 128, 144)

`General background color`
