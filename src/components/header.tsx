'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from './button/button';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Header() {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <header className="flex py-0 px-[16px] md:px-[32px] justify-between items-center self-stretch h-[64px] md:h-[80px] shrink-0">
      <div className="flex items-center gap-[20px] md:gap-[40px]">
        <div className="flex w-[120px] md:w-[142px] h-[28px] md:h-[32px]">
          <button
            onClick={() => void router.push('/')}
            className="border-none bg-transparent p-0"
          >
            <img
              className="h-[28px] md:h-[32px] w-auto cursor-pointer"
              alt="Logo"
              src="/logo.svg"
            />
          </button>
        </div>
        <div className="hidden md:flex items-center gap-[32px]">
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
      <div className="flex items-center gap-[8px] md:gap-[12px]">
        <Link
          href="https://my.idntty.io/account/login-with-passkey"
          className="hidden md:flex justify-center items-center text-gray-600 text-base font-semibold py-[10px] px-[16px] rounded-lg"
        >
          Login
        </Link>
        <Link href="https://my.idntty.io/account/type">
          <Button variant="primary" size={isMobile ? 'md' : 'lg'}>
            {isMobile ? 'IDNTTY' : 'Get IDNTTY'}
          </Button>
        </Link>
      </div>
    </header>
  );
}
