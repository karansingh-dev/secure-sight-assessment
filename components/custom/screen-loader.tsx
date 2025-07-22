import { LoaderCircle } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-none to-black">
      <div className="flex flex-col items-center gap-4 text-yellow-500 animate-pulse">
        <LoaderCircle className="w-10 h-10 animate-spin" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
