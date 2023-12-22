import Link from "next/link";

export default function FooterPage () {
    return (
        <> 
        <div className="hidden sm:flex justify-between items-center  self-stretch">
            <div className="text-m text-slate-900 font-normal leading-[150%]">
                <span className="underline">©</span>
                2023
            </div>
            <div className="text-m text-slate-900 font-normal leading-[150%]">
            Điều khoản SuZu
            </div>
            <div className="text-m text-slate-900 font-normal leading-[150%]">
            Chính sách riêng tư
            </div>
            <div className="text-m text-slate-900 font-normal leading-[150%]">
            Chính sách bảo mật
            </div>
        </div>

        <div className="sm:hidden nav-bar flex justify-between items-center gap-1 py-2">
          <Link href="/" className="home-button flex h-10 py-2 px-5 justify-center items-center rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5228 0.336112C10.1805 0.243432 9.81975 0.243432 9.47745 0.336112C9.08008 0.443702 8.74553 0.706359 8.47852 0.91599L8.40389 0.974402L1.62159 6.24953L1.54389 6.30987C1.16725 6.60216 0.835439 6.85966 0.58818 7.19396C0.371188 7.48735 0.209542 7.81785 0.11118 8.16926C-0.000900149 8.56967 -0.000446317 8.98968 6.89057e-05 9.46642L0.000139478 9.56481L0.000138524 16.8383C0.000120643 17.3654 0.000105144 17.8202 0.030709 18.1948C0.0630099 18.5901 0.134326 18.9833 0.32712 19.3617C0.61474 19.9262 1.07368 20.3851 1.63817 20.6728C2.01655 20.8656 2.40977 20.9369 2.80511 20.9692C3.17968 20.9998 3.63443 20.9998 4.16157 20.9997L15.8387 20.9997C16.3658 20.9998 16.8206 20.9998 17.1952 20.9692C17.5905 20.9369 17.9837 20.8656 18.3621 20.6728C18.9266 20.3851 19.3855 19.9262 19.6732 19.3617C19.866 18.9833 19.9373 18.5901 19.9696 18.1948C20.0002 17.8202 20.0002 17.3654 20.0001 16.8383V9.56481L20.0002 9.46643C20.0007 8.98969 20.0012 8.56967 19.8891 8.16926C19.7907 7.81786 19.6291 7.48735 19.4121 7.19396C19.1648 6.85967 18.833 6.60217 18.4564 6.30989L18.3787 6.24953L11.5964 0.974403L11.5218 0.915992C11.2548 0.70636 10.9202 0.443702 10.5228 0.336112ZM6 14.9998C5.44772 14.9998 5 15.4475 5 15.9998C5 16.552 5.44772 16.9998 6 16.9998L14 16.9998C14.5523 16.9998 15 16.552 15 15.9998C15 15.4475 14.5523 14.9998 14 14.9998L6 14.9998Z"
                fill="#0F172A"
              />
            </svg>
          </Link>

          <Link href="/" className="home-button flex h-10 py-2 px-5 justify-center items-center rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M19 19L15.5001 15.5M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z"
                stroke="#334155"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>

          <Link href="/" className="flex justify-center items-center gap-1">
            <div className="flex w-10 h-10 p-[6px] flex-col justify-center items-center gap-1 flex-shrink-0 rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px] border border-solid border-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M11 1.66666L11 20.3333M1.66667 11L20.3333 11"
                  stroke="#0F172A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </Link>

          <Link href="/" className="home-button flex h-10 py-2 px-5 justify-center items-center rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
            >
              <path
                d="M7.48854 19.55C8.15842 20.1412 9.03835 20.5 10.0021 20.5C10.9658 20.5 11.8457 20.1412 12.5156 19.55M15.7021 7.2C15.7021 5.68827 15.1015 4.23845 14.0326 3.16949C12.9636 2.10053 11.5138 1.5 10.0021 1.5C8.49034 1.5 7.04053 2.10053 5.97157 3.16949C4.90261 4.23845 4.30208 5.68827 4.30208 7.2C4.30208 10.1357 3.56152 12.1457 2.73426 13.4751C2.03645 14.5966 1.68754 15.1573 1.70034 15.3137C1.7145 15.4869 1.75119 15.553 1.89076 15.6565C2.01681 15.75 2.58504 15.75 3.72149 15.75L16.2827 15.75C17.4191 15.75 17.9873 15.75 18.1134 15.6565C18.253 15.553 18.2897 15.4869 18.3038 15.3137C18.3166 15.1573 17.9677 14.5966 17.2699 13.4751C16.4426 12.1457 15.7021 10.1357 15.7021 7.2Z"
                stroke="#334155"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>

          <Link href="/" className="home-button flex h-10 py-2 px-5 justify-center items-center rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
            >
              <path
                d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z"
                stroke="#334155"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>

        </div>
        </>
    )
}