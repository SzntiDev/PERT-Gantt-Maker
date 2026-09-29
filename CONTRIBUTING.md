# Contributing to PERT & Gantt Chart Generator

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

## Code of Conduct

This project follows a standard code of conduct. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### 🐛 Reporting Bugs

- Check if the issue already exists in [Issues](https://github.com/your-username/pert-gantt-generator/issues)
- Use the bug report template when creating a new issue
- Include steps to reproduce, expected behavior, and screenshots if applicable

### 💡 Suggesting Features

- Open an issue with the `enhancement` label
- Describe the feature and its use case clearly
- Explain how it aligns with the project's goals

### 🔧 Submitting Code

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Write or update tests if applicable
5. Submit a pull request

## Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/your-username/pert-gantt-generator.git
cd pert-gantt-generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Pull Request Process

1. **Branch naming**: Use `feature/description`, `fix/description`, or `docs/description`
2. **Commit messages**: Use clear, descriptive commit messages
3. **Description**: Explain what your PR does and why
4. **Review**: Wait for at least one review before merging

## Style Guide

### JavaScript / React

- Use functional components with hooks
- Keep components focused and reusable
- Use descriptive variable and function names
- Add comments for complex algorithm logic

### CSS

- Use CSS custom properties (variables) defined in `App.css`
- Follow the existing naming conventions
- Keep styles scoped and organized

### File Organization

```
src/
├── components/    # React components
├── utils/         # Pure logic (algorithms, helpers)
├── App.jsx        # Main app component
└── App.css        # Global styles
```

---

Thank you for contributing! 🎉
