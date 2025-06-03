import ListUsers from "@/features/list-users";
import { DetailProvider } from "@/providers/DetailProvider";
import DetailViews from "@/components/DetailViews";

export default function Home() {
  return (
    <DetailProvider>
      <div className="flex">
        <main className="container mx-auto flex-1 px-4 py-6 transition-all duration-300 md:px-0">
          <ListUsers />
        </main>
        <DetailViews />
      </div>
    </DetailProvider>
  );
}
