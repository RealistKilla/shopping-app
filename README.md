# Indigo Commerce - React Native App

A modern, high-performance e-commerce shopping application built with React Native and Expo. It features a curated product catalog, a seamless cart experience, and smooth, responsive animations following the "Indigo Commerce" design system.

## Features

- **Product Catalog:** View a beautifully styled grid of mock products.
- **Product Details:** Dedicated screens for each item with large imagery, pricing, and descriptions.
- **Shopping Cart:** Add, remove, and adjust quantities of products.
- **Global Toast Notifications:** Custom, animated in-app notifications providing instant feedback on user actions.
- **Performance Optimized:** Uses `React.memo`, `useCallback`, and native `FlatList` memory management to ensure smooth scrolling and prevent unnecessary re-renders.

---

## 🛠 Tech Stack & Rationale

We've selected a lightweight, modern stack designed for speed, developer experience, and scalability:

- **[Expo (v57)](https://expo.dev/) & [Expo Router](https://docs.expo.dev/router/introduction/)**
  - **Reason:** Provides a zero-configuration, Next.js-like file-based routing system. It eliminates standard React Navigation boilerplate, handles deep-linking effortlessly, and allows for rapid UI iterations.
  
- **[NativeWind (v4)](https://www.nativewind.dev/) & [Tailwind CSS](https://tailwindcss.com/)**
  - **Reason:** Utility-first styling bridges the gap between web and mobile styling. It allows for incredibly fast layout building directly in the JSX, keeping component files clean and ensuring a consistent design system (colors, spacing, typography) across the app.

- **[Zustand](https://zustand-demo.pmnd.rs/)**
  - **Reason:** Chosen for state management (cart items, quantities, toast notifications) because it is remarkably lightweight and boilerplate-free compared to Redux. It supports granular subscriptions (e.g., `useShallow`) which prevents unnecessary re-renders across the app.

- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)**
  - **Reason:** Used to build the custom Toast notification system. Reanimated moves animation execution off the JS thread and onto the UI thread, ensuring buttery smooth 60fps animations even when the app is processing heavy logic.

- **[Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)**
  - **Reason:** Far superior to the standard React Native `<Image>` component. It offers aggressive disk caching, faster load times, and built-in support for Blurhashes to show skeleton placeholders before images fully load.

- **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)**
  - **Reason:** A reliable, pre-bundled set of scalable vector icons (using Ionicons for the cart badge and quantity selectors) without the need to manage custom SVG paths or link external font assets.

---

## 🚀 Installation & Setup

> **Note:** This project strictly uses **Yarn** for package management. Please avoid using `npm` or `npx` commands.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (LTS recommended)
- [Yarn](https://yarnpkg.com/)
- An iOS Simulator (Mac only) or Android Emulator installed, OR the Expo Go app on your physical device.

### 1. Clone the repository

```bash
git clone https://github.com/RealistKilla/shopping-app.git
cd shopping-app
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start the development server

Start the Expo bundler:

```bash
yarn start
```

Once the bundler is running, you can press the following keys in your terminal:
- **`i`** to open the app in the iOS Simulator.
- **`a`** to open the app in the Android Emulator.
- Or, scan the **QR code** printed in the terminal using the Expo Go app on your physical iOS/Android device.

---

## 📂 Architecture & Folder Structure

This project follows a **Feature-Based Architecture** (often related to Domain-Driven Design or Feature-Sliced Design). Instead of grouping files by their technical type (e.g., putting all components in a `components/` folder and all hooks in a `hooks/` folder), code is organized by the **business feature** it belongs to.

### Why this architecture?
- **Maintainability & Scalability:** As the app grows, the root directory doesn't become a dumping ground. Features remain encapsulated and isolated.
- **Lower Cognitive Load:** When working on the shopping cart, all relevant UI components, hooks, and types are co-located in `src/features/cart/`. You don't have to jump across the entire codebase to understand a single feature.
- **High Cohesion, Low Coupling:** Features are self-contained and only expose what is necessary, making them easier to refactor, test, or even extract into separate packages later.

```text
src/
├── app/                  # Expo Router file-based routes (Screens & Layouts)
├── features/             # Feature-based domains (The core of the architecture)
│   ├── cart/             # Cart UI, Zustand store, and hooks
│   ├── product-listing/  # Main product grid
│   └── product-view/     # Individual product detail views
└── shared/               # Truly global code used across multiple domains
    ├── catalog/          # Mock product data, models, and constants
    ├── components/       # Global UI (Toast, CartBadge)
    └── hooks/            # Global hooks (useToast)
```

## 🧹 Code Quality

This project is configured with a strict linting setup to ensure clean code:
- **ESLint** (with Shopify's opinionated plugin)
- **Prettier** (with NativeWind class sorting)
- **TypeScript** (strict mode enabled)

To run the linter:
```bash
yarn lint
```
