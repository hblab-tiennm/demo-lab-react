# Phase 03: Profile Page
Status: 🟡 In Progress
Dependencies: Auth system (✅ Done)

## Objective
View và update thông tin cá nhân của user đang đăng nhập.

## Requirements
### Functional
- [ ] Display current user info
- [ ] Edit profile form (firstName, lastName, phone)
- [ ] Change password (future)
- [ ] Avatar upload (future)

### Non-Functional
- [ ] Form validation
- [ ] Success/Error toast messages
- [ ] Optimistic updates

## Implementation Steps
1. [ ] Tạo `useProfile.js` hook - Get/Update current user
2. [ ] Tạo `ProfileForm.jsx` component - Editable form
3. [ ] Update `ProfilePage.jsx` - Integrate edit mode
4. [ ] Add API call to update user

## Files to Create/Modify
- `src/infrastructure/repositories/auth.repository.js` - [MODIFY] Add updateProfile
- `src/presentation/hooks/useProfile.js` - [NEW]
- `src/presentation/pages/ProfilePage.jsx` - [MODIFY]
- `src/presentation/components/ProfileForm.jsx` - [NEW]

## API Endpoints
| Method | Endpoint | Body |
|--------|----------|------|
| GET | /api/auth/me | - |
| PUT | /api/users/:id | { firstName, lastName, phone } |

## UI States
```
View Mode → [Edit] button → Edit Mode → [Save] / [Cancel]
                                ↓
                           Validation
                                ↓
                           API Call
                                ↓
                       Success → Update Store → View Mode
                       Error → Show message
```

## Test Criteria
- [ ] Shows current user data
- [ ] Can switch to edit mode
- [ ] Form validates correctly
- [ ] Updates save successfully
- [ ] Store updates after save

---
Next Phase: [phase-04-stats.md](./phase-04-stats.md)
