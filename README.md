# ERP Auth & Error Design System Sandbox

A clean, high-fidelity standalone design sandbox created to validate, custom-style, and test enterprise-grade Authentication and Error components in complete isolation.

> **CRITICAL ARCHITECTURAL CONSTRAINT**
> - **Isolated Sandbox Only**: This repository is a standalone sandbox for validating component UI/UX patterns. It is **strictly NOT** the production Honesty ERP project.
> - **No External Framework Dependencies**: It does not depend on, assume, or couple with `Velzon` or any Honesty ERP internal modules.
> - **No Direct Integration**: Do not copy or merge this codebase directly into the production ERP. Instead, use this sandbox to validate layout concepts and export clean code patterns.

---

## 🏗️ Project Architecture & File Structure

This project follows a highly modular, single-page application structure powered by **React**, **TypeScript**, and **Vite**, with design utilities from **Tailwind CSS** and icons from **Lucide React**.

```text
/
├── src/
│   ├── components/
│   │   ├── auth/                # Core reusable Authentication elements
│   │   │   ├── AuthHeroPanel.tsx
│   │   │   ├── AuthLogoBlock.tsx
│   │   │   └── AuthShell.tsx
│   │   ├── error/               # Core reusable Error state elements
│   │   │   ├── ErrorActionGroup.tsx
│   │   │   ├── ErrorCard.tsx
│   │   │   ├── ErrorIllustration.tsx
│   │   │   ├── ErrorReferenceCode.tsx
│   │   │   ├── ErrorShell.tsx
│   │   │   └── ErrorSupportBlock.tsx
│   │   └── PreviewPane.tsx      # Sandbox view selector & viewport emulator
│   │
│   ├── pages/                   # Isolated views wrapping core components
│   │   ├── LoginPage.tsx
│   │   ├── AccountLockedPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   ├── MfaChallengePage.tsx
│   │   ├── PasswordExpiredPage.tsx
│   │   ├── SessionExpiredPage.tsx
│   │   ├── Error403Page.tsx
│   │   ├── Error404Page.tsx
│   │   ├── Error500Page.tsx
│   │   ├── Error503Page.tsx
│   │   ├── BackendOfflinePage.tsx
│   │   └── NetworkOfflinePage.tsx
│   │
│   ├── types/                   # Strictly separated TypeScript contracts
│   │   ├── design.types.ts
│   │   ├── auth.types.ts
│   │   └── error.types.ts
│   │
│   ├── dev-tools/               # Simulation/Design-only helper utilities
│   │   └── code-exporter/
│   │       ├── CodeExporter.tsx   # Legacy template exporter (Dev-only)
│   │       └── codeGenerators.ts  # Static code snippet generation strings
│   │
│   ├── App.tsx                  # Main Controller mounting Sidebar Controls & Preview Pane
│   ├── index.css                # Global styles, tailored with scoped isolation rules
│   └── main.tsx                 # Client entry-point
```

---

## 🔄 Dynamic State Flow

The application manages sandbox state linearly to enable side-by-side design reviews:

```text
       ┌────────────────────────┐
       │        App.tsx         │◄───────── [Resets, Global Defaults]
       └───────────┬────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
┌─────────────────┐ ┌───────────────────┐
│  ControlPanel   │ │    PreviewPane    │
│  (Left Sidebar) │ │  (Iframe Stage)   │
└────────┬────────┘ └─────────┬─────────┘
         │                    │
         │ [Config Payload]   ├─────────► Renders Selected Auth/Error Page
         └───────────────────►│           with interactive mock triggers
                              │
                              ▼
                    ┌───────────────────┐
                    │  Error & Auth     │
                    │  Shell Components │
                    └───────────────────┘
```

1. **App.tsx** maintains the master configuration object (`LoginConfig`), including brand names, active templates, and color states.
2. **ControlPanel** provides standard administrative dials to toggle layout models (`split`, `centered`, `glassmorphic`), modify color palettes, and trigger mock network errors.
3. **PreviewPane** isolates and frames the mock view inside an emulated viewport, compiling clean parameters to feed each standalone page view.

---

## 🔒 Security Hardening Policies

To meet rigorous corporate cybersecurity standards, the following policies are strictly built-in:

### 1. Zero-Leakage Credential Handling
- Raw credentials (passwords, usernames, OTP tokens) are never printed to the browser console.
- Form action callbacks are structured to bypass browser console output for raw auth objects, outputting only generic sanitization statuses.

### 2. Browser Blocking Eradication
- Standard `alert()` dialog functions are **100% banned**. All warning indicators or simulator resets utilize inline UI banners or asynchronous logging callbacks.

### 3. Developer Diagnostics Isolation (`debugMode`)
- Technical telemetry fields (stack traces, backend payload mocks) must **never** render in standard user-facing modes.
- In `ErrorReferenceCode`, an explicit parameter `debugMode` governs technical trace toggles:
  - **`debugMode === false` (Default)**: Normal users see only safe details and the sanitized reference code badge.
  - **`debugMode === true`**: Allows designers/operators to expand technical telemetry in the development sandbox, clearly flagged as a design simulation overlay.

---

## 🎨 Style Isolation Guidelines

To prevent integration regressions inside host ERP frames:

- **Tailwind Dependency**: All page styling is handled natively through direct Tailwind CSS classes, reducing static overrides.
- **Scoping Namespace (`.erp-auth-scope`)**: Any custom animations (such as `@keyframes fadeIn`) or non-Tailwind gradients (such as `.glassmorphic-screen-bg`) in `src/index.css` are nested within `.erp-auth-scope`.
- **Shell wrapper enforcement**: `AuthShell` and `ErrorShell` mount `.erp-auth-scope` at their root, ensuring custom CSS properties apply only inside the authenticating portal without polluting parent components.

---

## 🚀 Conversion Readiness Notes

To prepare this design sandbox for actual implementation and conversion, keep the following architectural guidance in mind:

### 1. Standalone React Architecture vs. Honesty ERP
This sandbox exists as a **purely client-side design and interactive prototyping playground**. It does not make live network requests or execute persistent state mutations.
- **Conversion Source of Truth**: The React / Angular modular component architecture in `src/components/` and `src/pages/` is the sole source of truth for design patterns, visual guidelines, and interactive flows.
- **State Integration**: During conversion, state variables (such as `domain`, `email`, `password`, and `mfa`) should be bound to the host ERP's secure state management systems (such as Redux, NgRx, or Context Providers) and passed over secure HTTPS REST/GraphQL APIs.
- **Zero Raw Data Escaping**: As hardened in `LoginPage.tsx`, login callbacks never emit raw password or MFA credentials to the parent container. The `onLogin` callback transmits only boolean confirmation flags (`domainProvided`, `emailProvided`, `passwordProvided`, `mfaProvided`, `remember`), ensuring 100% security boundary enforcement and zero raw credential leaks.

### 2. Legacy Static Template Exporter (Disabled by Default & Archived)
The workspace includes a legacy Code Exporter tool (`src/dev-tools/code-exporter/`) that compiles configurations into single-file static HTML documents.
- **Strict Prohibition for Production**: This legacy exporter is deprecated, disabled by default, and hidden behind `devMode` (Enable Developer Mode in the Control Panel). It is intended strictly for offline visual styling references.
- **DO NOT Use for ERP Integration**: The compiled static HTML output completely bypasses modularity, lacks security sandboxing, has SCSS generation completely stripped, and must **never** be used for direct Honesty ERP integration.
- **Component Translation**: Production deployment must utilize the structured, typed, and modular React component structure. Any future Honesty ERP conversion must rebuild this layout into native Angular ERP components, rather than copying legacy static generated SCSS or HTML files.
