Set up the page structure according to the following prompt:
   
<page-structure-prompt>
Next.js route structure based on navigation menu items (excluding main route). Make sure to wrap all routes with the component:

Routes:
- /dashboard
- /cards
- /subscriptions
- /files
- /history
- /calendar
- /settings

Page Implementations:
/dashboard:
Core Purpose: Provide overview of user's activity and key metrics
Key Components
- Activity summary cards
- Quick action buttons
- Recent transactions list
- Analytics charts
- Notification center
Layout Structure
- Grid layout with 2-4 columns
- Stacked cards on mobile
- Sidebar collapses to top menu on mobile

/cards:
Core Purpose: Manage payment methods and virtual cards
Key Components
- Card list

/grid view
- Add new card form
- Card details modal
- Transaction history per card
Layout Structure:
- Cards grid with 3 columns
- List view on mobile
- Floating action button for adding cards

/subscriptions:
Core Purpose: Track and manage recurring payments
Key Components
- Subscription list
- Payment schedule calendar
- Cost breakdown charts
- Subscription management tools
Layout Structure
- Two-column layout (list + details)
- Single column on mobile
- Sticky header with actions

/files:
Core Purpose: File storage and document management
Key Components
- File browser
- Upload zone
- Search and filter tools
- File preview modal
Layout Structure
- Three-panel layout (folders, files, preview)
- Collapsible panels on tablet
- Single panel with navigation on mobile

/history:
Core Purpose: View transaction and activity history
Key Components
- Timeline view
- Filter controls
- Export functionality
- Detailed transaction modal
Layout Structure
- Main content area with filters sidebar
- Full-width on mobile
- Infinite scroll implementation

/calendar:
Core Purpose: Schedule and manage appointments

/events
Key Components:
- Calendar grid
- Event creation form
- Day

/month views
- Event details sidebar
Layout Structure:
- Calendar occupies main space
- Sidebar for event details
- Bottom sheet on mobile for details

/settings:
Core Purpose: Configure user preferences and account settings
Key Components
- Settings categories
- Form controls
- Save

/reset buttons
- Profile management
Layout Structure:
- Two-column layout (navigation + settings)
- Tabbed interface on mobile
- Sticky save button

Layouts:
DefaultLayout:
- Applicable routes: All routes
- Core components
  - Top navigation bar
  - Sidebar navigation
  - User profile menu
  - Search bar
  - Footer
- Responsive behavior
  - Sidebar collapses to bottom navigation on mobile
  - Top bar becomes compact on scroll
  - Content area adjusts padding based on viewport

DashboardLayout
- Applicable routes: /dashboard, /cards, /subscriptions
- Core components
  - Quick actions bar
  - Notification center
  - Context-specific tools
- Responsive behavior
  - Tools collapse into dropdown on mobile
  - Flexible grid system
  - Scrollable containers

DocumentLayout
- Applicable routes: /files, /history
- Core components
  - Breadcrumb navigation
  - Action toolbar
  - Filter sidebar
- Responsive behavior
  - Sidebar becomes top filters on mobile
  - List/grid view toggle
  - Adaptive content containers
</page-structure-prompt>