Initialize Next.js in current directory:
```bash
mkdir temp; cd temp; npx create-next-app@latest . -y --typescript --tailwind --eslint --app --use-npm --src-dir --import-alias "@/*" -no --turbo
```

Now let's move back to the parent directory and move all files except prompt.md.

For Windows (PowerShell):
```powershell
cd ..; Move-Item -Path "temp*" -Destination . -Force; Remove-Item -Path "temp" -Recurse -Force
```

For Mac/Linux (bash):
```bash
cd .. && mv temp/* temp/.* . 2>/dev/null || true && rm -rf temp
```

Set up the frontend according to the following prompt:
<frontend-prompt>
Create detailed components with these requirements:
1. Use 'use client' directive for client-side components
2. Make sure to concatenate strings correctly using backslash
3. Style with Tailwind CSS utility classes for responsive design
4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
7. Create root layout.tsx page that wraps necessary navigation items to all pages
8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
9. Accurately implement necessary grid layouts
10. Follow proper import practices:
   - Use @/ path aliases
   - Keep component imports organized
   - Update current src/app/page.tsx with new comprehensive code
   - Don't forget root route (page.tsx) handling
   - You MUST complete the entire prompt before stopping

<summary_title>
Subscription Management Dashboard Interface
</summary_title>

<image_analysis>

1. Navigation Elements:
- Left sidebar with: Dashboard, Cards, Subscriptions, Files, History, Calendar, Settings
- Top bar with search functionality and user profile
- "Transfer money" and "Add new" primary action buttons


2. Layout Components:
- Left sidebar: 240px width
- Main content area: Fluid width
- Top header: 64px height
- Subscription cards: ~200px height each
- Consistent 16px padding throughout


3. Content Sections:
- Monthly/Yearly subscription summary ($284.34/$3240.43)
- Subscription list categorized by:
  - Recently Ended
  - Ending Soon
  - Active
- Each subscription entry shows: logo, name, plan, status, price, payment due, actions


4. Interactive Controls:
- Search bar with filter functionality
- Status badges (Active/Inactive)
- Action buttons (Pay, Renew)
- Three-dot menu for additional options
- Upgrade to PRO promotion card


5. Colors:
- Primary Purple: #7C5CFC
- Success Green: #2ECC71
- Danger Red: #FF4757
- Text Gray: #8395A7
- Background: #FFFFFF
- Border: #F1F2F6


6. Grid/Layout Structure:
- Single column list layout
- 24px gap between subscription cards
- Responsive container with max-width 1200px
- Consistent alignment of content columns
</image_analysis>

<development_planning>

1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar
│   │   ├── Header
│   │   └── SubscriptionList
│   ├── features/
│   │   ├── SubscriptionCard
│   │   ├── StatusBadge
│   │   └── SearchFilter
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```


2. Key Features:
- Subscription tracking and management
- Payment processing integration
- Status monitoring and notifications
- Search and filtering capabilities
- Subscription analytics


3. State Management:
```typescript
interface AppState {
├── subscriptions: {
│   ├── items: Subscription[]
│   ├── loading: boolean
│   ├── filters: FilterOptions
│   └── summary: SubscriptionSummary
├── }
├── user: {
│   ├── profile: UserProfile
│   ├── preferences: UserPreferences
│   └── notifications: Notification[]
├── }
}
```


4. Routes:
```typescript
const routes = [
├── '/dashboard',
├── '/subscriptions/*',
├── '/cards/*',
├── '/history/*',
└── '/settings/*'
]
```


5. Component Architecture:
- SubscriptionList (Container)
├── SubscriptionCard (Presentational)
├── StatusBadge (Shared)
├── ActionButtons (Shared)
└── SearchFilter (Feature)


6. Responsive Breakpoints:
```scss
$breakpoints: (
├── 'mobile': 320px,
├── 'tablet': 768px,
├── 'desktop': 1024px,
└── 'wide': 1200px
);
```
</development_planning>
</frontend-prompt>

IMPORTANT: Please ensure that (1) all KEY COMPONENTS and (2) the LAYOUT STRUCTURE are fully implemented as specified in the requirements. Ensure that the color hex code specified in image_analysis are fully implemented as specified in the requirements.