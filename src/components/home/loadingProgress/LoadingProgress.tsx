export default function LoadingProgress() {
  return (
    <>
      <div className="flex py-2 px-5 justify-center items-center gap-2 self-stretch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M11.25 1.125V3.625M11.25 16.875V20.875M5 10.875H1.5M20.5 10.875H19M17.7071 17.3321L17 16.625M17.9142 4.29079L16.5 5.705M4.17157 17.9534L7 15.125M4.37868 4.08368L6.5 6.205"
            stroke="#868686"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div className="text-grey-500 text-m font-semibold leading-[160%]">
        Chờ tí nhé, bên dưới còn nhiều lắm...
        </div>
      </div>
    </>
  );
}
