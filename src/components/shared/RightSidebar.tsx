import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const RightSidebar = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers(4);

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h2 className="h3-bold md:h2-bold text-left w-full">Suggested Users</h2>
        <div className='mt-7 flex w-[350px] flex-col gap-9'>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="flex flex-wrap gap-2">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[140px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;