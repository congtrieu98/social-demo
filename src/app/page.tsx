
import { getUserAuth } from "@/lib/auth/utils";
import HomeComponent from "@/components/home/HomeComponent";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <>
      {session ? (
        <HomeComponent />
      ) : (
        <HomeComponent />
      )}
    </>
  );
}
