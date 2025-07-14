import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import { Button } from '@/components/ui/button';

// Debug component for development - shows loader state and provides controls
export const LoaderDebugger: React.FC = () => {
  const { isLoading, setLoading, loadingText, forceHide } = useLoading();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-[60]">
      <div className="space-y-2">
        <div>
          <strong>Loader Status:</strong> {isLoading ? 'ACTIVE' : 'INACTIVE'}
        </div>
        {isLoading && (
          <div>
            <strong>Message:</strong> {loadingText}
          </div>
        )}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-6 px-2 text-xs"
            onClick={() => setLoading(true, "Test loader...")}
          >
            Test Show
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 px-2 text-xs"
            onClick={() => setLoading(false)}
          >
            Hide
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-6 px-2 text-xs"
            onClick={forceHide}
          >
            Force Hide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoaderDebugger;
