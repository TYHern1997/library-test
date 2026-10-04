# Library System: Automated Tests

![Playwright Tests](https://github.com/TYHern1997/library-test/actions/workflows/playwright.yml/badge.svg)

End-to-end tests for the Readers Reserve library app, built with [Playwright](https://playwright.dev) and run automatically on GitHub Actions.

**Live app:** https://library-frontend-mu-nine.vercel.app

## What's tested

- **Books:** the book list loads, and search filters the results
- **Login:** a user can sign in
- **Borrow and return:** a user can borrow a book and return it
- **Admin access:** the Users page is visible to admins only
- **Admin CRUD:** an admin can add, edit and delete a book

## Run locally 

```bash
npm ci
npx playwright install chromium
export KIM_PASSWORD="..."
export HARIS_PASSWORD="..."
npx playwright test --project=chromium
```

Passwords are read from environment variables. In CI they are stored as GitHub Actions secrets.

## Continuous integration

Every push runs the full test suite on GitHub Actions. The badge above shows whether the latest run passed.