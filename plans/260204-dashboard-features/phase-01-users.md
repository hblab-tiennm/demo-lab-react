# Phase 01: User Management
Status: 🟡 In Progress
Dependencies: DashboardLayout (✅ Done)

## Objective
Hiển thị danh sách users với pagination, search, và chi tiết user.

## Requirements
### Functional
- [ ] Hiển thị danh sách users trong bảng
- [ ] Pagination (10 users/page)
- [ ] Chi tiết user khi click
- [ ] Badge hiển thị role (Admin/User)
- [ ] Badge hiển thị verified status

### Non-Functional
- [ ] Loading skeleton khi fetch
- [ ] Error handling với message thân thiện
- [ ] Responsive table trên mobile

## Implementation Steps
1. [ ] Tạo `user.repository.js` - API calls cho user endpoints
2. [ ] Tạo `useUsers.js` hook - Fetch và manage users state
3. [ ] Update `UsersPage.jsx` - Integrate với useUsers hook
4. [ ] Tạo `UserCard.jsx` component - Hiển thị user info
5. [ ] Thêm Pagination component
6. [ ] Thêm Loading skeleton

## Files to Create/Modify
- `src/infrastructure/repositories/user.repository.js` - [NEW] API calls
- `src/presentation/hooks/useUsers.js` - [NEW] Hook
- `src/presentation/pages/UsersPage.jsx` - [MODIFY] Integrate API
- `src/presentation/components/UserCard.jsx` - [NEW] Component
- `src/presentation/components/Pagination.jsx` - [NEW] Component

## API Endpoints
| Method | Endpoint | Params |
|--------|----------|--------|
| GET | /api/users | ?page=1&limit=10 |
| GET | /api/users/:id | - |

## Test Criteria
- [ ] Users list loads correctly
- [ ] Pagination works
- [ ] Shows loading state
- [ ] Handles API error gracefully

---
Next Phase: [phase-02-posts.md](./phase-02-posts.md)
