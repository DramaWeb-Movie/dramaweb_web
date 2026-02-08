import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#0F0F0F]">
      <div className="text-center max-w-lg">
        <p className="text-[#E31837] font-semibold tracking-widest uppercase text-sm mb-2">
          Error 404
        </p>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          <span className="gradient-text">404</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
          Page not found
        </h2>
        <p className="text-[#B3B3B3] text-base mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link href="/browse">
            <Button variant="outline" size="lg">
              Browse
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
