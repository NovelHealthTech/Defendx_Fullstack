# Loader Components Usage Guide

This document explains how to use the common loader components throughout your application.

## Components Overview

### 1. Basic Loader (`Loader`)
A flexible loader component with multiple variants and sizes.

```tsx
import { Loader } from "@/components/ui/loader";

// Basic usage
<Loader />

// With custom text and size
<Loader text="Processing..." size="lg" />

// Overlay variant (covers parent element)
<Loader variant="overlay" text="Saving..." />

// Fullscreen variant (covers entire screen)
<Loader variant="fullscreen" text="Loading application..." size="xl" />
```

### 2. Inline Loader (`InlineLoader`)
Small loader for buttons and inline elements.

```tsx
import { InlineLoader } from "@/components/ui/loader";

// In buttons
<Button disabled={loading}>
  {loading && <InlineLoader className="mr-2" />}
  Save Changes
</Button>

// Inline in text
<span>
  Processing {isProcessing && <InlineLoader size="sm" />}
</span>
```

### 3. Page Loader (`PageLoader`)
Full-height loader for page-level loading states.

```tsx
import { PageLoader } from "@/components/ui/loader";

// In your page component
function MyPage() {
  if (loading) {
    return <PageLoader text="Loading dashboard..." />;
  }
  
  return <div>Your page content</div>;
}
```

### 4. Table Loader (`TableLoader`)
Skeleton loader for data tables.

```tsx
import { TableLoader } from "@/components/ui/loader";

// In your table
<div className="overflow-x-auto rounded-lg border bg-card">
  {loading ? (
    <div className="p-4">
      <TableLoader rows={5} />
    </div>
  ) : (
    <table>
      {/* Your table content */}
    </table>
  )}
</div>
```

## Global Loading Context

### Setup
The LoadingProvider is already set up in your main.tsx file.

### Usage Hooks

#### `useLoading()`
Direct access to global loading state.

```tsx
import { useLoading } from "@/contexts/LoadingContext";

function MyComponent() {
  const { isLoading, setLoading, loadingText } = useLoading();
  
  const handleSubmit = async () => {
    setLoading(true, "Saving data...");
    try {
      await saveData();
    } finally {
      setLoading(false);
    }
  };
}
```

#### `usePageLoading()`
Convenient hook for page-level loading.

```tsx
import { usePageLoading } from "@/contexts/LoadingContext";

function MyPage() {
  const { showPageLoader, hidePageLoader } = usePageLoading();
  
  useEffect(() => {
    const loadData = async () => {
      showPageLoader("Loading page data...");
      try {
        await fetchPageData();
      } finally {
        hidePageLoader();
      }
    };
    
    loadData();
  }, []);
}
```

#### `useApiLoading()`
Convenient hook for API calls.

```tsx
import { useApiLoading } from "@/contexts/LoadingContext";

function MyComponent() {
  const { showApiLoader, hideApiLoader } = useApiLoading();
  
  const handleApiCall = async () => {
    showApiLoader("Processing request...");
    try {
      const result = await api.call();
      return result;
    } finally {
      hideApiLoader();
    }
  };
}
```

## Best Practices

### 1. Choose the Right Loader Type
- **Global loaders** (`usePageLoading`, `useApiLoading`): For major operations that should block the entire UI
- **Local loaders** (`Loader`, `TableLoader`): For component-specific loading states
- **Inline loaders** (`InlineLoader`): For small elements like buttons

### 2. Meaningful Loading Messages
```tsx
// Good
showPageLoader("Loading customer data...");
showApiLoader("Saving changes...");

// Avoid generic messages when possible
showPageLoader("Loading...");
```

### 3. Proper Error Handling
```tsx
const handleOperation = async () => {
  showApiLoader("Processing...");
  try {
    await operation();
  } catch (error) {
    // Handle error
    showError(error.message);
  } finally {
    hideApiLoader(); // Always hide loader
  }
};
```

### 4. Component-Level Loading for Independent Operations
```tsx
function DataTable() {
  const [loading, setLoading] = useState(false);
  
  // Use local loading for table refresh
  const refreshTable = async () => {
    setLoading(true);
    try {
      await fetchTableData();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {loading ? <TableLoader /> : <Table data={data} />}
    </div>
  );
}
```

## Styling Customization

All loader components accept a `className` prop for custom styling:

```tsx
<Loader 
  className="text-blue-500" 
  text="Custom loading..."
/>

<InlineLoader className="text-green-500 w-5 h-5" />
```

## Migration Guide

If you have existing loading states, here's how to migrate:

### Before
```tsx
{loading && (
  <div className="flex items-center justify-center py-8">
    <Loader2 className="w-6 h-6 animate-spin mr-2" />
    <span>Loading...</span>
  </div>
)}
```

### After
```tsx
{loading && <Loader text="Loading..." />}
```

### For Page-Level Loading
```tsx
// Before
const [pageLoading, setPageLoading] = useState(true);

// After
const { showPageLoader, hidePageLoader } = usePageLoading();
```
