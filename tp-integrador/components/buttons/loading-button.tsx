import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, children, className, ...props }) => {
  return (
    <Button
      className={cn(className, { "opacity-50 cursor-not-allowed": loading })}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;