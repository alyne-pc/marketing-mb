# Mission Brasil - Project TODO

## Core Features
- [x] Restore Home page with hero section and policy distribution visible
- [x] Restore Request form (multi-step) with proper styling
- [x] Restore Confirmation page
- [x] Restore Dashboard page structure

## Database Schema
- [x] Create requests table (user submissions)
- [x] Create inventory table (inventory by size)
- [x] Create area stats table
- [x] Create users table with roles (admin/manager/user)
- [x] Database migrations applied

## Authentication & Authorization
- [x] OAuth setup (inherited from template)
- [ ] Implement manager role assignment
- [ ] Protect manager dashboard routes with role check
- [ ] Implement logout functionality

## Regulations & Policies
- [x] Display distribution policy prominently on home page
- [x] Create Regulations modal/dialog component
- [x] Add regulations content
- [x] Add regulations acceptance checkbox to form

## Request Form Features
- [x] Create tRPC router for requests
- [x] Form submission saves to database
- [x] Form validation
- [ ] Email notification to manager on new request
- [ ] Email notification to user on submission

## Manager Dashboard
- [x] Create tRPC procedures for dashboard queries
- [x] Display inventory (quantity by size)
- [x] Display inventory by area
- [x] Display total spent by area
- [x] Display all requests with status
- [x] Approve/Reject requests functionality
- [ ] Send approval/rejection emails to users
- [ ] Send approved request details to marketing
- [x] Build manager dashboard UI

## Request Status Flow
- [x] Status: Aguardando (waiting for manager approval)
- [x] Status: Aprovada (approved, waiting for delivery)
- [x] Status: Aguardando Entrega (waiting for marketing to deliver)
- [x] Status: Entregue (delivered)
- [ ] Update stock when approved (via approveRequest function)
- [ ] Update stock when delivered

## Email Integrations
- [ ] Manager receives notification on new request
- [ ] User receives approval/rejection email
- [ ] User receives instructions to contact marketing
- [ ] Marketing receives approved request details
- [ ] Marketing marks as delivered

## UI/UX Improvements
- [ ] Remove "Ver Exemplo" button from home
- [ ] Remove Privacy and Support links from footer
- [ ] Add Regulations link to footer
- [ ] Make distribution policy visible on home
- [ ] Responsive design for all pages
- [ ] Loading states for forms and tables
- [ ] Error handling and user feedback

## Testing
- [ ] Test form submission flow
- [ ] Test manager approval workflow
- [ ] Test email notifications
- [ ] Test stock updates
- [ ] Test authentication


## Admin Page & Permissions
- [x] Create managers table in database
- [x] Create admin page with master-only access
- [x] Implement manager CRUD (create, read, update, delete)
- [x] Implement stock management UI in admin page
- [x] Seed initial managers data
- [x] Restrict admin page to owner/master only

## Updated Request Form
- [x] Add telefone field
- [x] Add area dropdown (populated from managers)
- [x] Add gestor field (auto-filled based on area)
- [x] Add checkbox "É sua primeira solicitação?"
- [x] Add conditional date field for last request date
- [x] Add motivo da solicitação field
- [x] Update database schema for new fields
- [x] Create new tRPC procedure for updated request creation

## Email Notifications
- [ ] Send email to manager on new request
- [ ] Send email to user on approval/rejection
- [ ] Send email to marketing on approval
