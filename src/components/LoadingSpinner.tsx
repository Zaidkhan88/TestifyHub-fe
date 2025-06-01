interface LoadingSpinnerProps {
//   space: Space;
  className?: string; // ✅ Accept className as an optional prop
}
export default function LoadingSpinner({className = ''}:LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}