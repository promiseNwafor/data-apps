# Typeform Clone

## Project Overview

We're building a minimal Typeform-style application with a conversational form builder and renderer. The focus is on creating an intuitive, one-question-at-a-time experience that feels like a conversation rather than a traditional form.

## Core Features

### 1. Dashboard
- **Purpose**: Central hub for form management
- **Features**:
  - List all existing forms with metadata (title, creation date, response count)
  - "Create New Form" button to initiate form creation
  - Form actions (edit, delete, view responses)
- **Implementation**: Server Component for optimal performance

### 2. Create Form Modal
- **Trigger**: "Create New Form" button from dashboard or "Add" button in builder
- **Functionality**:
  - Modal with question type selection of different input types
  - **Create Mode**: Creates new form with selected question type, routes to builder
  - **Add Mode**: Adds new question to existing form in builder
- **Props**: `mode: 'create' | 'add'`... to differentiate behavior
- **Flow**: Selection → Database creation → Routes to builder with question preloaded

### 3. Form Builder
- **Layout**: Three-panel interface
  - **Left Panel**: Sequential question list (numbered 1, 2, 3...)
  - **Center Panel**: Live conversational preview of currently selected question
  - **Right Panel**: Question editor (type, title, description, validation (required))
- **Key Features**:
  - Add questions via modal integration
  - Edit question properties in real-time
  - Question type switching (dropdown in right panel)
  - **Save** button with server actions for database persistence
  - **Share** button to generate form link to the renderer
- **State**: Complex interactions managed by Context + useReducer

### 4. Form Renderer
- **Experience**: One question per screen, conversational flow
- **Features**:
  - Smooth transitions between questions
  - Progress indicator
  - Keyboard navigation (Enter to continue, letter shortcuts for choices)
  - Welcome screen and thank you screen
- **Design**: Colorful background with clean white form card

## Technical Requirements

### Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + shadcn components
- **State Management**: React Context + useReducer
- **Forms**: react-hook-form + Zod validation
- **Data Mutations**: Server Actions

### Component Architecture
```
src/
├── app/
│   ├── dashboard/              # Form management
│   ├── builder/[formId]/       # Form builder interface
│   ├── renderer/[formId]/      # Public form renderer
├── components/
│   ├── dashboard/              # Dashboard components
│   ├── builder/                # Builder components
│   ├── renderer/               # Renderer components
│   ├── shared/                 # Shared modals
│   └── ui/                     # shadcn components
├── contexts/
│   └── FormBuilderContext.tsx # Builder state management
├── lib/
│   └── db.ts                   # Prisma client
```

## Component Standards

### File Naming
- **Components**: PascalCase (e.g., `FormBuilder.tsx`, `QuestionEditor.tsx`)
- **Utilities**: camelCase (e.g., `formHelpers.ts`)
- **One component per file** with default export

### Code Quality
- **TypeScript**: Strict typing for all props and state
- **Error Handling**: Proper error boundaries and loading states
- **Accessibility**: WCAG compliance for form interactions
- **Performance**: Lazy loading and code splitting where appropriate

## Success Criteria

### Functional Requirements
- ✅ Create and manage forms from dashboard
- ✅ Build forms with sequential question addition
- ✅ Live preview of conversational experience
- ✅ Public form rendering with one-question-at-a-time flow
- ✅ Data persistence with Server Actions

### User Experience
- ✅ Intuitive form building process
- ✅ Conversational feel (not traditional form experience)
- ✅ Smooth transitions and responsive design
- ✅ Keyboard navigation and accessibility

### Technical Excellence
- ✅ Clean component architecture with proper separation of concerns
- ✅ Type-safe implementation with comprehensive TypeScript
- ✅ Efficient state management with Context + useReducer
- ✅ Modern Next.js patterns (Server Actions, App Router)

## Development Notes

- **Timeline**: 60-minute implementation target
- **Approach**: Build incrementally, I'll confirm each phase before proceeding
- **Dependencies**: Check package.json for available libraries, add as needed
- **Review Process**: Complete each phase before moving to the next

## Edge Cases to Consider

1. **Empty States**: No forms on dashboard, no questions in builder
2. **Validation**: Required fields, question type constraints
3. **Error Handling**: Server failures, network issues, malformed data
4. **Responsive Design**: Mobile form filling experience
5. **Performance**: Large forms with many questions