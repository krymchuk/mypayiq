# mypayIQ - Smart Subscription Management

A modern subscription and payment management dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern and responsive UI
- 📱 Mobile-first design
- 🎯 Subscription tracking and management
- 📊 Payment analytics
- 🔍 Search and filtering capabilities
- 🎭 Status monitoring
- 🖼️ Optimized image loading
- 🔐 Secure authentication with Supabase

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase Auth
- Lucide React Icons

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd mypayiq
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Add your Supabase credentials

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # App router pages
├── components/
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   ├── features/          # Feature components
│   └── shared/            # Shared/reusable components
├── styles/                # Global styles
└── utils/                 # Utility functions
```

## Color Scheme

- Primary Purple: #7C5CFC
- Success Green: #2ECC71
- Danger Red: #FF4757
- Text Gray: #8395A7
- Background: #FFFFFF
- Border: #F1F2F6

## Available Routes

- `/` - Home page
- `/dashboard` - Main dashboard
- `/subscriptions` - Subscription management
- `/cards` - Payment cards
- `/files` - File management
- `/history` - Transaction history
- `/calendar` - Calendar view
- `/settings` - User settings

## Development

The project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## License

MIT
