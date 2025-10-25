# Step 2 CK Scores Dashboard

A config-driven medical scores dashboard for Step 2 CK preparation, built with React, TypeScript, and Vite.

## Features

- **Learn Mode**: Interactive learning interface with formulas, criteria, and action cues
- **Drill Mode**: Practice with randomized case scenarios
- **Config-Driven**: Easy to add new scores by creating TypeScript files
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run type-check` - Run TypeScript type checking

## Adding New Scores

1. Create a new file in `src/scores/` using `_template.ts` as a reference
2. Export a `ScoreDef` object with `learn` and `drill` properties
3. Register the score in `src/scores/index.ts` by importing and adding to the `SCORES` array

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with:

- **Automated Testing**: Runs on every push and pull request
- **Code Quality**: ESLint, Prettier, and TypeScript checks
- **Security Scanning**: Dependency audits and vulnerability checks
- **Automated Deployment**: Deploys to staging (develop branch) and production (main branch)
- **Release Management**: Automated releases with changelog generation

### Pipeline Features

- Lint and type checking
- Unit testing with Vitest
- Security scanning with npm audit and Snyk
- Build verification
- Automated deployment to staging and production
- Dependency updates with Dependabot
- Pre-commit hooks for code quality

## Deployment

The application can be deployed to:

- **Vercel**: Configured with `vercel.json`
- **Netlify**: Configured with `netlify.toml`
- **GitHub Pages**: Via GitHub Actions
- **Any static hosting**: Build output in `dist/` directory

## Contributing

1. Follow the conventional commit format
2. Ensure all tests pass
3. Run linting and formatting before committing
4. Create feature branches from `develop`
5. Submit pull requests to `develop` branch

## License

Private project for medical education purposes.
