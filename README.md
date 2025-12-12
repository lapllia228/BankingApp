# Banking App

A modern banking application demonstrating enterprise-level Angular development practices, built as a technical assessment project.

## Overview

This application implements a complete banking system with account management, transaction history, and internal transfers. It showcases proficiency in Angular 19, TypeScript, reactive programming with RxJS, and modern frontend development patterns.

## Features

### Authentication
- Mock authentication system with form validation
- Protected routes with Angular Guards
- Persistent login sessions using localStorage
- Automatic navigation based on authentication state

### Account Management
- Multi-account dashboard with real-time balance display
- Account selection and detailed views
- Refresh functionality simulating API calls with RxJS observables

### Transaction History
- Comprehensive transaction list with pagination (10 items per page)
- Advanced filtering:
  - Search by merchant/description
  - Filter by transaction type (All/Debit/Credit)
  - Sort by date (newest/oldest first)
- Color-coded transaction amounts (red for debits, green for credits)
- Formatted dates and currency display

### Money Transfers
- Internal transfer functionality between user accounts
- Reactive form validation:
  - Amount validation (minimum value)
  - Balance verification (insufficient funds check)
  - Required field validation
- Real-time balance updates
- Transaction history creation for both sender and receiver
- Success feedback with automatic redirection

### Data Persistence
- LocalStorage integration for state management
- Automatic data initialization from mock services
- Persistent data across page refreshes and browser sessions

## Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 19.x | Core framework with standalone components |
| **TypeScript** | 5.6+ | Type-safe development |
| **RxJS** | 7.8+ | Reactive programming and async operations |
| **Tailwind CSS** | 3.4+ | Utility-first styling framework |
| **Angular Router** | 19.x | Client-side routing and navigation |
| **Reactive Forms** | 19.x | Form handling and validation |

## Project Architecture

```
banking-app/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality
│   │   │   ├── guards/              # Route guards
│   │   │   │   └── auth.guard.ts    # Authentication guard
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   │   ├── account.model.ts
│   │   │   │   └── transaction.model.ts
│   │   │   └── services/            # Business logic services
│   │   │       ├── account.service.ts
│   │   │       ├── auth.service.ts
│   │   │       └── storage.service.ts
│   │   │
│   │   ├── features/                # Feature modules
│   │   │   ├── accounts/            # Accounts list
│   │   │   ├── login/               # Authentication
│   │   │   ├── transactions/        # Transaction history
│   │   │   └── transfer/            # Money transfer
│   │   │
│   │   ├── shared/                  # Shared components
│   │   │   └── components/
│   │   │       └── header/          # App header with logout
│   │   │
│   │   ├── app.component.ts         # Root component
│   │   ├── app.config.ts            # Application configuration
│   │   └── app.routes.ts            # Route definitions
│   │
│   ├── styles.css                   # Global styles
│   └── main.ts                      # Application entry point
│
├── angular.json                     # Angular CLI configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Angular CLI (optional, for development)

### Installation

```bash
git clone https://github.com/lapllia228/BankingApp.git

cd BankingApp

npm install
```

### Development Server

```bash
ng serve

npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
# Production build
ng build --configuration production

# Output will be in dist/ directory
```

## Demo Credentials

For testing purposes, use the following credentials:

- **Email:** `test@bank.com`
- **Password:** `123456`

## Key Implementation Details

### Design Patterns
- **Service Layer:** Separation of concerns with dedicated services for authentication, account management, and storage
- **Guard Pattern:** Route protection using functional guards
- **Reactive Programming:** Observable-based data flow with RxJS
- **Component Architecture:** Standalone components following Angular 19 best practices

### State Management
- Client-side state management using localStorage
- Mock data initialization on first load
- Persistent state across sessions

### Form Handling
- Reactive Forms with comprehensive validation
- Custom validators for business logic (balance checks)
- Real-time validation feedback

### Routing Strategy
- Lazy-loaded feature modules
- Protected routes with authentication guard
- Automatic redirects based on auth state

## Available Routes

| Route | Description | Protected |
| `/login` | Login page | No |
| `/accounts` | Accounts dashboard | Yes |
| `/accounts/:id` | Transaction history for specific account | Yes |
| `/accounts/:id/transfer` | Money transfer form | Yes |

## Testing Workflow

1. **Login:** Use demo credentials to authenticate
2. **View Accounts:** Browse the account dashboard
3. **Select Account:** Click on any account to view transactions
4. **Filter Transactions:** Use search and filter controls
5. **Test Pagination:** Navigate through transaction pages
6. **Transfer Money:** 
   - Click "Transfer" button
   - Select destination account
   - Enter amount (validation will prevent overdraft)
   - Submit and verify balance updates
7. **Logout:** Clear session and return to login
8. **Persistence:** Refresh page to verify data persistence

