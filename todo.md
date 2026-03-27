# Mission Brasil - Project TODO

## Core Features
- [ ] Restore Home page with hero section and policy distribution visible
- [ ] Restore Request form (multi-step) with proper styling
- [ ] Restore Confirmation page
- [ ] Restore Dashboard page structure

## Database Schema
- [ ] Create requests table (user submissions)
- [ ] Create stock table (inventory by size)
- [ ] Create approvals table (manager decisions)
- [ ] Create deliveries table (marketing tracking)
- [ ] Create users table with roles (admin/manager/user)

## Authentication & Authorization
- [ ] Implement manager login (OAuth)
- [ ] Implement admin role for owner
- [ ] Protect manager dashboard routes
- [ ] Implement logout functionality

## Regulations & Policies
- [ ] Create Regulations modal/dialog component
- [ ] Add regulations content
- [ ] Add regulations acceptance checkbox to form
- [ ] Display distribution policy prominently on home page

## Request Form Features
- [ ] Form submission saves to database
- [ ] Form validation
- [ ] Email notification to manager on new request
- [ ] Email notification to user on submission

## Manager Dashboard
- [ ] Display inventory (quantity by size)
- [ ] Display inventory by area
- [ ] Display total spent by area
- [ ] Display all requests with status
- [ ] Approve/Reject requests functionality
- [ ] Send approval/rejection emails to users
- [ ] Send approved request details to marketing

## Request Status Flow
- [ ] Status: Aguardando (waiting for manager approval)
- [ ] Status: Aprovada (approved, waiting for delivery)
- [ ] Status: Aguardando Entrega (waiting for marketing to deliver)
- [ ] Status: Entregue (delivered)
- [ ] Update stock when approved
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
