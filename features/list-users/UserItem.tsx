import { User } from "@/types/users";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FC } from "react";
import ListRepos from "../list-repos";

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <AccordionItem value={`${user.id}`}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-3 w-full">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-10 h-10 rounded-full border"
          />
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{user.login}</span>
              {user.site_admin && (
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  Admin
                </span>
              )}
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">
                {user.type}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              ID: {user.id}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
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
