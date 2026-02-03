# Phase 04: Statistics Dashboard
Status: 🟡 In Progress
Dependencies: User & Post repos

## Objective
Hiển thị thống kê tổng quan với số liệu và biểu đồ.

## Requirements
### Functional
- [ ] Summary cards (Total Users, Posts, Verified)
- [ ] Line chart: Users/Posts theo thời gian (future)
- [ ] Pie chart: Users by role (future)
- [ ] Recent activity list

### Non-Functional
- [ ] Real-time count updates
- [ ] Responsive grid
- [ ] Loading skeletons

## Implementation Steps
1. [ ] Tạo `stats.repository.js` - Fetch counts (or calculate from APIs)
2. [ ] Tạo `useStats.js` hook - Aggregate statistics
3. [ ] Update `StatsPage.jsx` - Display real data
4. [ ] Tạo `StatCard.jsx` component - Reusable stat card
5. [ ] (Future) Integrate chart library (recharts/chart.js)

## Files to Create/Modify
- `src/infrastructure/repositories/stats.repository.js` - [NEW]
- `src/presentation/hooks/useStats.js` - [NEW]
- `src/presentation/pages/StatsPage.jsx` - [MODIFY]
- `src/presentation/components/StatCard.jsx` - [NEW]

## Data Calculation
```javascript
// Stats DTO
{
  totalUsers: await usersRepo.getCount(),
  totalPosts: await postsRepo.getCount(),
  verifiedUsers: users.filter(u => u.settings?.isEmailVerified).length,
  recentUsers: users.slice(0, 5)
}
```

## API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/users | Get users for count |
| GET | /api/posts | Get posts for count |

> Note: Có thể cần thêm BE endpoint `/api/stats` để optimize

## Chart Libraries (Future)
- Option 1: **recharts** - React-native, easy to use
- Option 2: **chart.js** + react-chartjs-2 - More flexible
- Option 3: **visx** - D3-based, highly customizable

## Test Criteria
- [ ] Shows correct total counts
- [ ] Cards display properly
- [ ] Handles loading state
- [ ] Works with empty data

---
Complete! Back to: [plan.md](./plan.md)
