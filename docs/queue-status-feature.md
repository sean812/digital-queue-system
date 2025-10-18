# Queue Status Feature - Customer Ticket Tracking

## Overview
Added a "Check Status" feature that allows customers to track their ticket position even after navigating away from the system.

## New Components

### 1. TicketLookup Component
- **Purpose**: Search for existing tickets
- **Search Options**:
  - By Ticket Number (ID)
  - By Phone Number
- **Features**:
  - Real-time ticket search
  - Error handling for not found tickets
  - User-friendly interface with tips

### 2. QueueStatus Component
- **Purpose**: Display current queue status and customer position
- **Features**:
  - Shows customer's current position in queue
  - Displays total waiting count
  - Lists all tickets in queue order
  - Highlights customer's ticket in the list
  - Shows estimated wait time
  - Real-time updates via Socket.IO
  - Special alert when it's customer's turn
  - Color-coded status indicators

## User Flow

### For New Customers
1. Home → "New Customer" → Select Service → Enter Name → Enter Phone → Get Ticket
2. See ticket number and position

### For Returning Customers
1. Home → "Check Status"
2. Enter Ticket Number OR Phone Number
3. View queue status with:
   - Current position
   - Total people waiting
   - Estimated wait time
   - Full queue list
   - Visual highlighting of their ticket

### Updated Home Screen
- **New Customer** - Get a new ticket
- **Check Status** - Track existing ticket (NEW!)
- **Staff Member** - Manage queue

## Technical Details

### API Endpoints Used
- `GET /api/tickets` - Fetch all tickets for search and display

### Real-time Updates
- Socket.IO events for `ticket:created` and `ticket:served`
- Queue position updates automatically
- No need to refresh

### Data Flow
1. Customer searches by ID or phone
2. System fetches all tickets from backend
3. Finds matching ticket
4. Calculates position in waiting queue
5. Displays full queue with real-time updates

## UI Highlights
- **Color-coded alerts**: Green when it's your turn, blue while waiting
- **Position badge**: Large, prominent display of queue position
- **Queue visualization**: See everyone ahead of you
- **Estimated wait time**: Based on position (3 min per person)
- **Service icons**: Visual identification of service types

## Benefits
- Customers can leave and return without losing track
- Reduces anxiety by showing clear position
- Transparent queue management
- Works with existing database (no new tables needed)
