# My Store - React Native App

A modern, high-performance e-commerce shopping application built with React Native and Expo. It features a curated product catalog, a seamless cart experience, and smooth, responsive animations following the "My Store" design system.

## Features

- **Product Catalog:** View a beautifully styled grid of mock products.
- **Product Details:** Dedicated screens for each item with large imagery, pricing, and descriptions.
- **Shopping Cart:** Add, remove, and adjust quantities of products.
- **Global Toast Notifications:** Custom, animated in-app notifications providing instant feedback on user actions.
- **Performance Optimized:** Uses `React.memo`, `useCallback`, and native `FlatList` memory management to ensure smooth scrolling and prevent unnecessary re-renders.

---

## 🛠 Tech Stack & Rationale

I've selected a lightweight, modern stack designed for speed, developer experience, and scalability:

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

- **[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)**
  - **Reason:** Provides a comprehensive set of scalable vector icons (using Ionicons for the cart badge and quantity selectors). As detailed in [Expo's blog](https://expo.dev/blog/moving-away-from-expo-vector-icons), selecting a standalone icon library over `@expo/vector-icons` significantly reduces the final app bundle size by not bundling every font family by default. *Note: Due to custom font linking requirements, this library necessitates compiling the native app and does not render inside Expo Go.*

### Trade-Offs & Considerations

While this stack optimizes for developer velocity, it does come with a few architectural trade-offs:

- **Expo Ecosystem Lock-in:** 
  Expo provides phenomenal abstractions (EAS, OTA updates, prebuilds), but leaning heavily into Expo Router and Expo-managed infrastructure creates a degree of vendor lock-in. If the app eventually requires deeply customized native modules without existing Expo Config Plugins, maintaining the Continuous Native Generation (CNG) pipeline can introduce significant friction compared to a bare React Native setup.

- **NativeWind Compatibility Quirks:** 
  NativeWind bridges Tailwind and React Native via a complex Babel transformation and CSS interop layer. While excellent for standard `View` and `Text` components, it occasionally clashes with third-party native libraries. For example, during development, I experienced rendering bugs where NativeWind failed to accurately pass explicit width/height styles down to the underlying `expo-image` layout engine, requiring us to bypass the utility classes and fallback to inline `style={{...}}` dimensions to fix the image rendering.

---

## 🚀 Installation & Setup

> **Note:** This project strictly uses **Yarn** for package management. Please avoid using `npm` or `npx` commands.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (LTS recommended)
- [Yarn](https://yarnpkg.com/)
- An iOS Simulator (Mac only) or Android Emulator installed, OR the Expo Go app on your physical device.
- **Java 21 SDK** (Required for local native Android builds on Windows. Newer versions like Java 22+ may cause strict Gradle daemon crashes).

### 1. Clone the repository

```bash
git clone https://github.com/RealistKilla/shopping-app.git
cd shopping-app
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start the development server (Expo Go)

Start the Expo bundler:

```bash
yarn start
```

Once the bundler is running, you can press the following keys in your terminal:
- **`i`** to open the app in the iOS Simulator.
- **`a`** to open the app in the Android Emulator.
- Or, test on a physical device. **Requirement:** You must explicitly download the **Expo Go** app from the Apple App Store or Google Play Store. Once downloaded, scan the **QR code** printed in the terminal using your device's camera (iOS) or directly inside the Expo Go app (Android).

> [!WARNING]
> **Expo Go Incompatibility:** The app uses `react-native-vector-icons` which requires custom native fonts to be bundled. Because Expo Go is a pre-compiled app, it cannot load these custom fonts, and the icons will appear as crossed-out boxes. **To see the icons display correctly, you must bypass Expo Go and run the local build command below.**

### 4. Build Native Apps Locally (Optional)

If you want to compile and run the actual native Android or iOS application locally (instead of using the Expo Go client), use the provided build scripts:

```bash
yarn build:android
yarn build:ios
```

> **Android Build Caveat (WSL/Linux):** If you are building the Android app locally in a headless environment like WSL without the full Android Studio GUI, the build may fail with a `LicenceNotAcceptedException`. You must accept the Android SDK licenses before compiling. You can do this by running `yes | sdkmanager --licenses` via the Android command-line tools, or by copying your accepted `licenses` directory from your Windows host over to your WSL Android SDK folder.

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

## 🧹 Linting & Code Quality

This project is configured with a strict linting setup to ensure clean code:
- **ESLint**: Utilizes the highly opinionated `@shopify/eslint-plugin` to enforce industry-standard best practices, React hooks rules, and consistent import ordering.
- **Prettier**: Pre-configured with the `prettier-plugin-tailwindcss` to automatically sort your NativeWind classes, ensuring styling strings are always organized consistently.
- **TypeScript**: Strict mode enabled across the entire repository to guarantee type safety for Zustand stores, components, and catalog data.

To run the linter manually:
```bash
yarn lint
```

---

## 🧪 Testing

I believe in high-value, resilient testing. My test suite covers everything from isolated business logic to full end-to-end user flows.

### Unit Testing (Jest)
I use **Jest** alongside `@testing-library/react-native` to test state, hooks, and core components.
- **Scope:** Covers Zustand stores (`useCartStore`, `useToast`), computed selectors, dummy data fallbacks, and UI components (e.g. `CartBadge`).
- **Run Unit Tests:**
  ```bash
  yarn test
  ```
- **Run Unit Tests in Watch Mode:**
  ```bash
  yarn test:watch
  ```

### End-to-End Testing (Maestro)
I use **Maestro** for robust, black-box E2E testing. Unlike traditional Detox tests, Maestro tests are written in easy-to-read YAML flows located in the `.maestro/` directory.
- **Scope:** Tests the most critical conversion paths, such as navigating the product grid, adding items to the cart, modifying quantities, removing items, and verifying global Toast notifications.
- **Install Maestro:**
  ```bash
  yarn setup:maestro
  ```
- **Run E2E Tests:** *(Requires a running Simulator/Emulator and your development build running)*
  ```bash
  yarn test:e2e
  ```

> [!NOTE]
> **CI/CD Integration:** I have included a `.github/workflows/e2e.yml` GitHub Action demonstrating how these tests would integrate with Maestro Cloud in a production environment. For the purpose of this assessment, no API keys have been provided, so the workflow is set to gracefully pass. Please run the tests locally to verify them.
