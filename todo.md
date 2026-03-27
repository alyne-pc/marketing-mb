# Mission Brasil - Project TODO

## Core Features
- [x] Restore Home page with hero section and policy distribution visible
- [ ] Restore Request form (multi-step) with proper styling
- [ ] Restore Confirmation page
- [ ] Restore Dashboard page structure

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
- [ ] Create Regulations modal/dialog component
- [ ] Add regulations content
- [ ] Add regulations acceptance checkbox to form

## Request Form Features
- [ ] Create tRPC router for requests
- [ ] Form submission saves to database
- [ ] Form validation
- [ ] Email notification to manager on new request
- [ ] Email notification to user on submission

## Manager Dashboard
- [ ] Create tRPC procedures for dashboard queries
- [ ] Display inventory (quantity by size)
- [ ] Display inventory by area
- [ ] Display total spent by area
- [ ] Display all requests with status
- [ ] Approve/Reject requests functionality
- [ ] Send approval/rejection emails to users
- [ ] Send approved request details to marketing
- [ ] Build manager dashboard UI

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
