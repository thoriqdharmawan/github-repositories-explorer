import { User } from "@/types/users";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC } from "react";
import { Eye } from "lucide-react";
import ListRepos from "../list-repos";

interface UserItemProps {
  user: User;
  onViewDetails?: (user: User) => void;
}

const UserItem: FC<UserItemProps> = ({ user, onViewDetails }) => {
  return (
    <AccordionItem value={`${user.id}`}>
      <AccordionTrigger className="p-4 hover:no-underline sm:p-6">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-3">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-10 w-10 flex-shrink-0 rounded-full border sm:h-12 sm:w-12"
            />
            <div className="min-w-0 flex-1 text-left">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-foreground truncate text-sm font-medium sm:text-base">
                  {user.login}
                </span>
                {user.site_admin && (
                  <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs whitespace-nowrap text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                    Admin
                  </span>
                )}
                <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs whitespace-nowrap capitalize">
                  {user.type}
                </span>
              </div>
              <div className="text-muted-foreground mt-1 text-xs sm:text-sm">
                ID: {user.id}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 sm:flex-shrink-0 sm:gap-3 md:justify-end">
            <div
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(user);
              }}
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground flex h-7 cursor-pointer items-center rounded-md border px-2 text-xs whitespace-nowrap transition-colors sm:px-3"
            >
              <Eye className="mr-1 h-3 w-3" />
              Details
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 text-xs whitespace-nowrap hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View Profile
            </a>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="pt-2">
          <ListRepos user={user} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default UserItem;
