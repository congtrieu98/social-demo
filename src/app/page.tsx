
import SignIn from "@/components/auth/SignIn";
import { Button } from "@/components/ui/button";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="pt-2">
      {
        !session ? <SignIn /> :
          <div className="flex max-w-[574px] flex-col py-4 items-start gap-2.5 rounded-[20px] bg-white">

            <div className="flex px-4 justify-between items-start self-stretch">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex w-10 h-10 flex-col items-start">
                  <div className="flex rounded-tl-[10px] rounded-br-[10px] rounded-tr-2xl rounded-bl-2xl bg-slate-100 flex-col justify-center items-center gap-2.5 p-2">
                    <div className="text-slate-900 text-m font-normal leading-6">AB</div>
                  </div>
                  <Button>
                    <div className="absolute right-0 bottom-0 rounded-full bg-slate-900 gap-4 flex items-center w-4 h-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6.00001 1.33334L6.00001 10.6667M1.33334 6.00001L10.6667 6.00001" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </Button>
                </div>
                <div className="text-slate-900 text-m font-semibold leading-[150%]">
                  Display name
                </div>
              </div>
              <div className="flex items-center gap-2">

              </div>
            </div>

          </div>
      }

    </main>
  );
}
