'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from './button/button';

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex py-0 px-[32px] justify-between items-center self-stretch h-[80px] shrink-0">
      <div className="flex items-center gap-[40px]">
        <div className="flex w-[142px] h-[32px]">
          <button
            onClick={() => void router.push('/')}
            className="border-none bg-transparent p-0"
          >
            <img
              className="h-[32px] w-[88.961px] cursor-pointer"
              alt="Logo"
              src="/logo.svg"
            />
          </button>
        </div>
        <div className="flex items-center gap-[32px]">
          <Link
            href="/"
            className="flex justify-center items-center text-gray-600 text-base font-semibold"
          >
            Overview
          </Link>
          <Link
            href="/about-us"
            className="flex justify-center items-center text-gray-600 text-base font-semibold"
          >
            About Us
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
        <Link
          href="/login"
          className="flex justify-center items-center text-gray-600 text-base font-semibold py-[10px] px-[16px] rounded-lg"
        >
          Login
        </Link>
        <Button variant="primary" size="lg">
          Get IDNTTY
        </Button>
      </div>
    </header>
  );
}
