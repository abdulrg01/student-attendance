import Link from "next/link";

const HeroNav = () => {
  return (
    <article className="mx-auto w-full max-w-screen-lg">
      <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full bg-transparent backdrop-blur-lg transition-all mt-3">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex justify-between items-center w-full pt-3">
            <img
              src="/logo-icon.png"
              alt="logo"
              className="w-9 h-9 object-contain rounded-full"
            />
            <Link
              href="/login"
              className="rounded-full border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
            >
              Signin
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
};

export default HeroNav;
