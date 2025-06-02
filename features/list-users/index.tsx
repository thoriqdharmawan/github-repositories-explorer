import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const USERS = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Brown" },
];

const ListUsers = () => {
  return (
    <div className="m-auto max-w-2xl p-4">
      <Input />
      <Button className="mt-4 w-full">Searh</Button>

      <div>
        <Accordion type="single" collapsible>
          {USERS.map((user) => (
            <AccordionItem key={user.id} value={`item-${user.id}`}>
              <AccordionTrigger>{user.name}</AccordionTrigger>
              <AccordionContent>
                <p>User ID: {user.id}</p>
                <p>
                  Email: {user.name.toLowerCase().replace(" ", ".")}@example.com
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ListUsers;
