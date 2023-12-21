
import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import HomeComponent from "@/components/home/HomeComponent";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="pt-2">
      {session ? (
        <HomeComponent />
      ) : (
        <HomeComponent />
      )}
    </main>
  );
}
