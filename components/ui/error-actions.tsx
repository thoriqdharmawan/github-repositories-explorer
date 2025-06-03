import { Button } from "@/components/ui/button";
import { GitBranch, RefreshCw } from "lucide-react";
import { FC } from "react";

interface ErrorActionsProps {
  onRetry: () => void;
  isRateLimitError?: boolean;
  onOAuthLogin?: () => void;
  retryLabel?: string;
  loginLabel?: string;
  className?: string;
}

const ErrorActions: FC<ErrorActionsProps> = ({
  onRetry,
  isRateLimitError = false,
  onOAuthLogin,
  retryLabel = "Try Again",
  loginLabel = "Login with GitHub",
  className = "",
}) => {
  const handleOAuthLogin = () => {
    if (onOAuthLogin) {
      onOAuthLogin();
    } else {
      // Default OAuth login implementation
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      const callbackUrl = process.env.NEXT_PUBLIC_AUTHORIZATION_CALLBACK_URI;
      const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${callbackUrl}&scope=read:user`;
      window.location.href = oauthUrl;
    }
  };

  if (isRateLimitError) {
    return (
      <div className={`flex flex-col gap-2 sm:flex-row ${className}`}>
        <Button variant="default" size="sm" onClick={handleOAuthLogin}>
          <GitBranch className="mr-2 h-4 w-4" />
          {loginLabel}
        </Button>
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {retryLabel}
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={onRetry} className={className}>
      <RefreshCw className="mr-2 h-4 w-4" />
      {retryLabel}
    </Button>
  );
};

export default ErrorActions;
