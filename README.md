# Project Tracker — Kanban Board

A project management tool built with React + TypeScript and Tailwind CSS.

## State Management Decision

I used React's built-in useState hook to manage all task and column state 
locally inside the Kanban component.

Why not Zustand or Context?
- The application currently has a single view (Kanban) with no deeply 
  nested components that need shared state
- useState is sufficient when state lives in one parent and is passed 
  to direct children
- No async operations or cross-route state sharing is needed at this stage
## Drag and Drop Implementation

Built from scratch using native browser drag events — no external libraries 
or APIs used.

How it works:

1. draggable=true is set on every task card div
2. onDragStart stores the taskId and source column key in React state
3. onDragOver calls preventDefault() on each column — this is required 
   by the browser to allow a drop to happen
4. onDrop reads the stored taskId and source, finds the task in the 
   source column, removes it, and pushes it into the target column
5. State update is done with spread operators to avoid mutating state directly

The entire system uses four native browser events only:
- dragstart
- dragover  
- drop

## Lighthouse Score

| Metric | Score |
|---|---|
| Performance | 100 |
| Accessibility | 66 |
| Best Practices | 100 |
| SEO | 90 |

<img width="1918" height="854" alt="image" src="https://github.com/user-attachments/assets/ed68649c-b433-4a7c-a37a-8938b1ddb416" />


## What's Completed

- [x] Kanban board with 4 columns (To Do, In Progress, In Review, Finished)
- [x] Task cards with priority badge, assignee, due date
- [x] Overdue date highlighting in red
- [x] Drag and drop between columns (custom, no library)
- [x] Add and remove tasks
- [x] Performance score 100 on Lighthouse
