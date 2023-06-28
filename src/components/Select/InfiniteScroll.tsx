import { useEffect, useRef, ReactNode } from 'react';

interface InfiniteScrollDropdownProps {
  height: string;
  hasMore?: boolean;
  isLoading?: boolean;
  next?: () => void;
  children: ReactNode;
}

const InfiniteScrollDropdown = ({
  height,
  hasMore,
  isLoading,
  next,
  children,
}: InfiniteScrollDropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      hasMore &&
      !isLoading &&
      next
    ) {
      next();
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore, isLoading, next]);

  return (
    <div
      ref={containerRef}
      className={`overflow-y-auto border border-gray-300 rounded-md px-3 py-2 hide-scrollbar`}
      style={{ maxHeight: height, minHeight: 40 }}
    >
      {children}
      {isLoading && (
        <div className="flex justify-center mt-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollDropdown;
