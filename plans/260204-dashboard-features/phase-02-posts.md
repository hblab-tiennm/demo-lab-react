# Phase 02: Post Management
Status: 🟡 In Progress
Dependencies: Phase 01 (User repo pattern)

## Objective
CRUD đầy đủ cho posts với multi-language support (translations).

## Requirements
### Functional
- [ ] List posts với cards layout
- [ ] Create new post với form
- [ ] Edit existing post
- [ ] Delete post với confirmation
- [ ] Multi-language content (title, description)

### Non-Functional
- [ ] Optimistic UI updates
- [ ] Form validation
- [ ] Toast notifications

## Implementation Steps
1. [ ] Tạo `post.repository.js` - CRUD API calls
2. [ ] Tạo `usePost.js` hook - Single post operations
3. [ ] Tạo `usePosts.js` hook - List posts với pagination
4. [ ] Tạo `PostCard.jsx` - Display post info
5. [ ] Tạo `PostForm.jsx` - Create/Edit form
6. [ ] Tạo `DeleteConfirmModal.jsx` - Confirm delete
7. [ ] Update `PostsPage.jsx` - Integrate all

## Files to Create/Modify
- `src/infrastructure/repositories/post.repository.js` - [NEW]
- `src/presentation/hooks/usePost.js` - [NEW]
- `src/presentation/hooks/usePosts.js` - [NEW]
- `src/presentation/pages/PostsPage.jsx` - [MODIFY]
- `src/presentation/components/PostCard.jsx` - [NEW]
- `src/presentation/components/PostForm.jsx` - [NEW]
- `src/presentation/components/DeleteConfirmModal.jsx` - [NEW]

## API Endpoints
| Method | Endpoint | Body |
|--------|----------|------|
| GET | /api/posts | - |
| GET | /api/posts/:id | - |
| POST | /api/posts | { translations: [...] } |
| PUT | /api/posts/:id | { translations: [...] } |
| DELETE | /api/posts/:id | - |

## Data Structure
```javascript
// Post DTO
{
  id: "uuid",
  userId: "uuid",
  translations: [
    { languageCode: "en", title: "...", description: "..." },
    { languageCode: "vi", title: "...", description: "..." }
  ],
  createdAt: "ISO date",
  updatedAt: "ISO date"
}
```

## Test Criteria
- [ ] Can create new post
- [ ] Can edit existing post
- [ ] Can delete post
- [ ] Multi-language works
- [ ] Validation shows errors

---
Next Phase: [phase-03-profile.md](./phase-03-profile.md)
