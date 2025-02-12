'use client';

import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';

export default function Header() {
  return (
    <footer className="flex pt-[64px] pb-[48px] flex-col items-center gap-[20px] w-full">
      <div className="flex max-w-[1280px] px-[32px] flex-col gap-[48px] w-full">
        <div className="flex gap-[32px] grow-1 shrink-0 basis-0">
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
      <div className="flex max-w-[1280px] px-[32px] flex-col gap-[32px] w-full">
        <div className="flex pt-[32px] border-t border-solid border-[#E4E7EC] gap-y-[24px] justify-between items-end content-end">
          <div className="text-gray-500 text-base/normal">
            © 2025 IDNTTY. All rights reserved.
          </div>
          <div className="flex justify-end items-end gap-[24px]">
            <SocialIcon
              url="https://x.com"
              bgColor="white"
              fgColor="#98A2B3"
              className="w-[24px] h-[24px]"
            />
            <SocialIcon
              url="https://github.com"
              bgColor="white"
              fgColor="#98A2B3"
              className="w-[24px] h-[24px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
