'use client';

import { useState, useEffect } from 'react';
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from 'motion/react';
import lookup from 'country-code-lookup';

import EncryptedWidget from '@/components/encrypted-widget';
import Header from '@/components/header';
import Widget from '@/components/widget';
import Button from '@/components/button/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1,
    },
  },
};

const childVariants = {
  hidden: {
    y: -300,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const getRandomDate = () => {
  const start = new Date(1980, 0, 1);
  const end = new Date(2005, 11, 31);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const getRandomCountry = () => {
  const countryCodes = lookup.countries.map(
    (country: { iso2: string }) => country.iso2
  );
  const randomIndex = Math.floor(Math.random() * countryCodes.length);
  return countryCodes[randomIndex];
};

// Function to get a random badge from the list
const getRandomBadge = () => {
  const badgeIds = [
    '3b5b7dc7-5246-442e-ab0f-709796624a97',
    '5150560c-f4e0-421a-9ab2-051b23ec754a',
    '55ee01c5-2499-4602-a6cb-7cd3b0b6f112',
    '5db19864-1375-4317-96ba-239cc95554c4',
    '69ae6dd5-cda7-4ef1-88dd-9ac06a912c19',
    '859ce018-85cd-48a4-a2f6-4bbc9ef0a87c',
    '8ad7e179-650a-4ccc-b083-efb26539915f',
    '985cabc0-6a8c-4f2e-aa83-4dbe861e79b1',
    'a1beae70-4434-45eb-94a4-2d6411a83096',
    'a964448a-7dd7-446a-9154-aae4c8f39af0',
    'c9e7caf2-b340-4ad2-8482-c7177e87ebe0',
    'd3ca86f6-d26b-4055-aeb7-125dc22a95fe',
    'e6d84e7d-ee89-4e0d-bdf5-9d1d5dedc9ad',
    'ee1d1e95-5ca7-48c4-804b-d168a04bde41',
    'f98c8b27-aa65-48e8-93d0-6badab21e4ba',
  ];
  const randomIndex = Math.floor(Math.random() * badgeIds.length);
  return `https://d1nyjrmwcoi38d.cloudfront.net/badges/${badgeIds[randomIndex]}`;
};

// Ensure we don't select the same badge twice
const getUniqueRandomBadges = () => {
  const usedBadges = new Set();

  return () => {
    let badge = getRandomBadge();
    // Try to get a unique badge if we've already used this one
    while (usedBadges.has(badge) && usedBadges.size < 15) {
      badge = getRandomBadge();
    }
    usedBadges.add(badge);
    return badge;
  };
};

const getRandomBadges = getUniqueRandomBadges();

const widgetConfigs = [
  {
    size: 'long',
    type: 'bio' as const,
    value:
      "I'm a Data Scientist with a passion for uncovering insights and solving complex problems through data. Let's connect and turn data into actionable knowledge!",
  },
  {
    size: 'tiny',
    type: 'badge' as const,
    getValue: getRandomBadges,
  },
  {
    size: 'tiny',
    type: 'badge' as const,
    getValue: getRandomBadges,
  },
  {
    size: 'long',
    type: 'name' as const,
    value: '**************',
  },
  {
    size: 'tiny',
    type: 'citizenship' as const,
    getValue: getRandomCountry,
  },
  {
    size: 'tiny',
    type: 'age' as const,
    getValue: getRandomDate,
  },
  {
    size: 'long',
    type: 'hobby' as const,
    value: 'Gaming',
  },
  {
    size: 'long',
    type: 'relationship' as const,
    value: 'Looking for Love',
  },
];

const calculateGridPositions = (configs: typeof widgetConfigs) => {
  const grid = Array(12).fill(null);
  const shuffledConfigs = [...configs].sort(() => Math.random() - 0.5);

  let configIndex = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (configIndex >= shuffledConfigs.length) {
        break; // No more widgets to place
      }

      const config = shuffledConfigs[configIndex];
      const gridIndex = row * 4 + col;

      if (grid[gridIndex] === null) {
        if (config.size === 'long') {
          if (col < 3 && grid[gridIndex + 1] === null) {
            grid[gridIndex] = config;
            grid[gridIndex + 1] = 'occupied';
            col++; // Skip the next column as it's occupied by the long widget
          } else {
            // If long widget can't fit in this position, try to place a tiny widget instead if available
            const tinyWidgetConfigs = shuffledConfigs
              .slice(configIndex)
              .filter((c) => c.size === 'tiny');
            if (tinyWidgetConfigs.length > 0) {
              const tinyConfig = tinyWidgetConfigs[0];
              grid[gridIndex] = tinyConfig;
              const tinyIndexInShuffled = shuffledConfigs.indexOf(
                tinyConfig,
                configIndex
              );
              shuffledConfigs.splice(tinyIndexInShuffled, 1); // Remove tiny widget from shuffledConfigs to avoid duplicates
              shuffledConfigs.splice(configIndex, 0, tinyConfig); // Move tiny widget to current index
            } else {
              grid[gridIndex] = 'empty'; // Mark as empty if no widget can be placed
            }
          }
        } else {
          grid[gridIndex] = config;
        }
        configIndex++;
      }
    }
  }

  // Return only the actual widgets (remove 'occupied' markers)
  return grid.filter(
    (item): item is typeof widgetConfigs[number] =>
      item !== null && item !== 'occupied'
  );
};

// Modified animation variants for fade-in only
const widgetVariants = {
  initial: {
    opacity: 0, // Start fully transparent
  },
  animate: {
    opacity: 1, // Fade in to fully opaque
    transition: {
      duration: 0.3, // Short duration for fade-in
      delay: 0.1, // Slight delay if needed
    },
  },
  exit: {
    // Optional exit animation
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function Home() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const { scrollYProgress } = useScroll();
  const [gridPositions, setGridPositions] = useState(() =>
    calculateGridPositions(widgetConfigs)
  );
  // Use the imported useIsMobile hook instead
  const isMobile = useIsMobile();

  useEffect(() => {
    setGridPositions(calculateGridPositions(widgetConfigs));
  }, []);

  // Function to adapt widget size for mobile
  const getMobileWidgetSize = (size: 'long' | 'tiny') => {
    if (isMobile) {
      // Prevent overlapping widgets with appropriate sizing
      return size === 'long'
        ? {
            width: '100% !important',
            maxWidth: '100% !important',
            minWidth: '100%',
          }
        : { width: '100%', maxWidth: '180px' };
    }
    return {};
  };

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!hasPlayed && latest > (isMobile ? 0.35 : 0.3)) {
      setHasPlayed(true);
    }
  });

  return (
    <div className="flex flex-col items-center bg-white w-full overflow-hidden">
      <div className="flex flex-col items-center w-full overflow-hidden">
        <Header />
        <div className="flex py-[48px] md:py-[96px] flex-col items-center gap-[32px] md:gap-[64px] px-[16px] md:px-0 w-full overflow-hidden">
          <div className="flex flex-col items-center gap-[24px] md:gap-[32px]">
            <div className="flex flex-col items-center gap-[32px] md:gap-[48px]">
              <div className="flex flex-col items-center gap-[16px] md:gap-[24px] max-w-full md:max-w-[1024px] w-full">
                <h1 className="text-center text-[36px]/[44px] md:text-[60px]/[72px] -tracking-[0.6px] md:-tracking-[1.2px] text-gray-900 font-semibold w-full max-w-[calc(100vw-32px)] md:max-w-full overflow-hidden break-words">
                  <span className="inline-block">Own</span>{' '}
                  <span className="inline-block text-white rounded-[40px] bg-brand-600 py-[4px] md:py-[6px] px-[8px] md:px-[20px]">
                    your identity.
                  </span>{' '}
                  <span className="inline-block">Trust your world.</span>
                </h1>
                <div className="max-w-full md:max-w-[768px] text-gray-600 text-center text-[16px]/normal md:text-xl/normal px-[16px] md:px-0">
                  Empower your digital journey with self-sovereign identity and
                  verifiable credentials. Build trust, reduce friction, and take
                  control with open ecosystem.
                </div>
              </div>
            </div>
          </div>

          {/* Widget Grid for Desktop, Carousel for Mobile */}
          <div className="flex flex-col items-center w-full max-w-full">
            {isMobile ? (
              <Carousel className="w-full px-[16px] max-w-full overflow-x-hidden">
                <CarouselContent className="overflow-visible gap-[16px]">
                  {gridPositions.map((config, index) =>
                    config ? (
                      <CarouselItem
                        key={`${config.type}-${index}`}
                        className={
                          config.size === 'long'
                            ? 'basis-full w-full max-w-full'
                            : 'basis-[70%]'
                        }
                      >
                        <div className="p-[4px] w-full mx-[12px]">
                          <div
                            className={
                              config.size === 'long'
                                ? 'w-full max-w-full'
                                : 'w-full'
                            }
                          >
                            <Widget
                              size={config.size as 'long' | 'tiny'}
                              type={config.type}
                              value={
                                config.getValue
                                  ? config.getValue()
                                  : config.value
                              }
                              style={getMobileWidgetSize(
                                config.size as 'long' | 'tiny'
                              )}
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ) : null
                  )}
                </CarouselContent>
                <div className="flex justify-center gap-x-[16px] mt-[24px]">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            ) : (
              <div className="w-[840px] max-w-[1280px] grid grid-cols-4 gap-[40px] py-[20px]">
                <AnimatePresence>
                  {gridPositions.map((config, index) =>
                    config ? (
                      <motion.div
                        key={`${config.type}-${index}`}
                        layout
                        className={
                          config.size === 'long'
                            ? 'col-span-2 inline-block'
                            : 'inline-block'
                        }
                        variants={widgetVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                          layout: {
                            type: 'spring',
                            stiffness: 120,
                            damping: 18,
                          },
                        }}
                      >
                        <Widget
                          size={config.size as 'long' | 'tiny'}
                          type={config.type}
                          value={
                            config.getValue ? config.getValue() : config.value
                          }
                          style={getMobileWidgetSize(
                            config.size as 'long' | 'tiny'
                          )}
                        />
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "Open Ecosystem Built for Innovation" Section */}
      <div className="flex flex-col py-[48px] md:py-[96px] items-center gap-[32px] md:gap-[64px] bg-black w-full">
        <div className="flex flex-col md:flex-row max-w-[1280px] px-[16px] md:px-[32px] gap-[32px] md:gap-[64px]">
          <div className="flex flex-col max-w-full md:max-w-[360px] gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
            <div className="flex flex-col gap-[16px] md:gap-[24px] self-stretch">
              <img
                src="/asterisk.svg"
                alt="Asterisk"
                className="w-[48px] md:w-[56px] h-[48px] md:h-[56px]"
              />
              <div className="self-stretch text-white text-[24px]/[32px] md:text-[36px]/[44px] font-semibold -tracking-[0.72px]">
                An Open Ecosystem Built for Innovation
              </div>
            </div>
            <div className="self-stretch text-brand-200 text-[16px]/normal md:text-xl/normal">
              Our open, blockchain-based ecosystem allows you to create and
              manage digital identity and credentialing solutions tailored to
              your needs—whether for individuals, communities, businesses, or
              large enterprises.
            </div>
          </div>
          <div className="flex flex-col gap-y-[24px] md:gap-y-[32px] w-full md:flex-wrap md:flex-row md:gap-x-[64px] md:grow-1 md:shrink-0 md:basis-0">
            <div className="flex w-full md:min-w-[280px] md:max-w-[560px] gap-[8px] md:grow-1 md:shrink-0 md:basis-0 flex-col self-stretch">
              <div className="self-stretch text-white text-[18px]/normal md:text-xl/normal font-semibold">
                Employee Achievement & Corporate Rewards
              </div>
              <div className="self-stretch text-brand-200 text-[14px]/normal md:text-base/normal">
                Corporations can create custom digital badges to recognize
                employee accomplishments, fostering motivation and engagement.
                From performance milestones to innovation awards, employees gain
                verified proof of their success.
              </div>
            </div>
            <div className="flex w-full md:min-w-[280px] md:max-w-[560px] gap-[8px] md:grow-1 md:shrink-0 md:basis-0 flex-col self-stretch">
              <div className="self-stretch text-white text-[18px]/normal md:text-xl/normal font-semibold">
                Community Recognition with Digital Badges
              </div>
              <div className="self-stretch text-brand-200 text-[14px]/normal md:text-base/normal">
                Empower any community—small or large—to issue verifiable digital
                badges as a token of recognition for contributions, skills, or
                achievements. Members can proudly showcase their credentials
                across platforms.
              </div>
            </div>
            <div className="flex w-full md:min-w-[280px] md:max-w-[560px] gap-[8px] md:grow-1 md:shrink-0 md:basis-0 flex-col self-stretch">
              <div className="self-stretch text-white text-[18px]/normal md:text-xl/normal font-semibold">
                Verified Training Certifications for Education Providers
              </div>
              <div className="self-stretch text-brand-200 text-[14px]/normal md:text-base/normal">
                Training companies can issue verifiable course completion
                certificates and skill-based digital badges. These credentials
                enhance trust and provide learners with portable, verifiable
                proof of their expertise.
              </div>
            </div>
            <div className="flex w-full md:min-w-[280px] md:max-w-[560px] gap-[8px] md:grow-1 md:shrink-0 md:basis-0 flex-col self-stretch">
              <div className="self-stretch text-white text-[18px]/normal md:text-xl/normal font-semibold">
                Decentralized Customer Loyalty Programs
              </div>
              <div className="self-stretch text-brand-200 text-[14px]/normal md:text-base/normal">
                Businesses can establish blockchain-powered loyalty programs
                where customers receive verifiable credentials as proof of
                membership. This ensures seamless authentication, fraud
                prevention, and personalized rewards.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Be the master of your digital identity" Section */}
      <div className="flex flex-col py-[48px] md:py-[96px] items-center gap-[32px] md:gap-[64px] w-full overflow-hidden">
        <div className="flex max-w-[1280px] px-[16px] md:px-[32px] flex-col items-center md:items-end gap-[24px] md:gap-[32px] w-full">
          <div className="flex max-w-full md:max-w-[768px] flex-col items-center md:items-end gap-[16px] md:gap-[20px]">
            <div className="flex flex-col items-center md:items-end gap-[8px] md:gap-[12px]">
              <div className="self-stretch text-brand-700 text-center md:text-right text-[14px]/normal md:text-base/normal font-semibold">
                Self-Sovereign Identity
              </div>
              <div className="self-stretch text-gray-900 text-center md:text-right text-[24px]/[32px] md:text-[36px]/[44px] font-semibold -tracking-[0.72px]">
                Be the master of your digital identity
              </div>
            </div>
            <div className="self-stretch text-gray-600 text-center md:text-right text-[16px]/normal md:text-xl/normal">
              Say goodbye to third-party control. With Self-Sovereign Identity,
              you own your identity, decide who gets access, and share only
              what&apos;s necessary.
            </div>
          </div>
        </div>

        {/* Vertical layout on mobile, horizontal on desktop */}
        <div className="flex flex-col md:flex-row max-w-[1280px] px-[16px] md:px-[32px] gap-[40px] md:gap-[64px] w-full overflow-hidden">
          {/* Animated widgets - on top for mobile, on left for desktop */}
          <motion.div
            className="relative w-full md:w-[600px] grid grid-cols-3 order-2 md:order-1 max-w-full overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={hasPlayed ? 'show' : 'hidden'}
          >
            <motion.div
              variants={childVariants}
              className="-rotate-9 col-span-2"
            >
              <Widget
                size="long"
                type="bio"
                value="I'm a Data Scientist with a passion for uncovering insights..."
              />
            </motion.div>
            <div className="ml-[-20px]" />

            <div className="mt-[-60px]" />
            <motion.div
              variants={childVariants}
              className="rotate-23 mt-[-60px] ml-[-20px]"
            >
              <Widget
                size="tiny"
                type="citizenship"
                value={getRandomCountry()}
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="-rotate-12 mt-[-60px] ml-[-20px]"
            >
              <EncryptedWidget size="tiny" />
            </motion.div>

            <motion.div
              variants={childVariants}
              className="-rotate-23 mt-[-20px]"
            >
              <Widget
                size="tiny"
                type="badge"
                className="overflow-hidden"
                value={getRandomBadges()}
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="rotate-10 mt-[-20px] ml-[-20px]"
            >
              <Widget
                size="tiny"
                type="relationship"
                value="Looking for Love"
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="rotate-4 mt-[-20px] ml-[-20px]"
            >
              <Widget size="tiny" type="age" value={getRandomDate()} />
            </motion.div>

            <motion.div
              variants={childVariants}
              className="-rotate-8 mt-[-20px]"
            >
              <Widget size="tiny" type="hobby" value="Gaming" />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="rotate-7 col-span-2 mt-[-20px] ml-[-20px]"
            >
              <Widget size="long" type="name" value="**************" />
            </motion.div>
          </motion.div>

          {/* Content - on top for mobile, on right for desktop */}
          <div className="flex flex-col gap-y-[32px] w-full md:flex-row md:gap-y-[48px] md:gap-x-[32px] order-1 md:order-2 md:flex-wrap">
            <div className="flex w-full md:min-w-[240px] flex-col gap-[16px] md:gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
              <img
                src="/control.svg"
                alt="Control"
                className="w-[48px] h-[48px]"
              />
              <div className="flex flex-col gap-[8px] self-stretch">
                <div className="self-stretch text-gray-900 text-[18px]/normal md:text-xl/normal font-semibold">
                  Full Control Over Your Identity
                </div>
                <div className="self-stretch text-gray-600 text-[14px]/normal md:text-base/normal">
                  You decide which identity attributes to include—name, age,
                  nationality, certifications, or anything else. Everything is
                  encrypted, and only you hold the keys to access and manage
                  your data. No central authority, no middlemen, just pure
                  ownership.
                </div>
              </div>
            </div>
            <div className="flex w-full md:min-w-[240px] flex-col gap-[16px] md:gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
              <img src="/trust.svg" alt="Trust" className="w-[48px] h-[48px]" />
              <div className="flex flex-col gap-[8px] self-stretch">
                <div className="self-stretch text-gray-900 text-[18px]/normal md:text-xl/normal font-semibold">
                  Community-Verified Trust
                </div>
                <div className="self-stretch text-gray-600 text-[14px]/normal md:text-base/normal">
                  Build credibility by allowing trusted users to verify your
                  identity attributes—and do the same for others. This
                  decentralized trust model creates a network of authenticated,
                  peer-backed identities without relying on a central authority.
                </div>
              </div>
            </div>
            <div className="flex w-full md:min-w-[240px] flex-col gap-[16px] md:gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
              <img
                src="/customize.svg"
                alt="Customize"
                className="w-[48px] h-[48px]"
              />
              <div className="flex flex-col gap-[8px] self-stretch">
                <div className="self-stretch text-gray-900 text-[18px]/normal md:text-xl/normal font-semibold">
                  Customize & Expand Your Identity
                </div>
                <div className="self-stretch text-gray-600 text-[14px]/normal md:text-base/normal">
                  Missing an important detail? No problem! You can add new
                  attributes to your identity at any time. Whether it&apos;s a
                  new skill, social handle, or personal statement, your digital
                  identity evolves as you do—dynamic, flexible, and fully yours.
                </div>
              </div>
            </div>
            <div className="flex w-full md:min-w-[240px] flex-col gap-[16px] md:gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
              <img
                src="/choose.svg"
                alt="Choose"
                className="w-[48px] h-[48px]"
              />
              <div className="flex flex-col gap-[8px] self-stretch">
                <div className="self-stretch text-gray-900 text-[18px]/normal md:text-xl/normal font-semibold">
                  Private or Public—You Choose
                </div>
                <div className="self-stretch text-gray-600 text-[14px]/normal md:text-base/normal">
                  Easily share specific identity details with a person,
                  organization, or make them public. Need to revoke access?
                  Instantly take back control with a single action, ensuring
                  your data is always shared on your terms.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Prove It, Without a Doubt" Section */}
      <div className="flex flex-col py-[48px] md:py-[96px] items-center gap-[32px] md:gap-[64px] w-full overflow-hidden">
        <div className="flex max-w-[1280px] px-[16px] md:px-[32px] flex-col items-center md:items-end gap-[24px] md:gap-[32px] w-full">
          <div className="flex max-w-full md:max-w-[768px] flex-col items-center md:items-end gap-[16px] md:gap-[20px]">
            <div className="flex flex-col items-center md:items-end gap-[8px] md:gap-[12px]">
              <div className="self-stretch text-brand-700 text-center md:text-right text-[14px]/normal md:text-base/normal font-semibold">
                Verifiable Credentials
              </div>
              <div className="self-stretch text-gray-900 text-center md:text-right text-[24px]/[32px] md:text-[36px]/[44px] font-semibold -tracking-[0.72px]">
                Prove It, Without a Doubt
              </div>
            </div>
            <div className="self-stretch text-gray-600 text-center md:text-right text-[16px]/normal md:text-xl/normal">
              Share trusted, tamper-proof credentials with ease. Verifiable
              Credentials let you prove your qualifications, identity, and
              achievements—securely and on your terms.
            </div>
          </div>
        </div>

        {/* Vertical layout on mobile, horizontal on desktop */}
        <div className="flex flex-col md:flex-row max-w-[1280px] px-[16px] md:px-[32px] w-full relative items-center justify-between gap-[40px] md:gap-0 overflow-hidden">
          <div className="flex flex-col gap-y-[32px] w-full md:flex-row md:gap-y-[48px] md:gap-x-[32px] md:grow-1 md:shrink-0 md:basis-0 md:flex-wrap md:max-w-[576px]">
            <div className="flex w-full md:min-w-[240px] flex-col gap-[16px] md:gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
              <img
                src="/issuance.svg"
                alt="Issuance"
                className="w-[48px] h-[48px]"
              />
              <div className="flex flex-col gap-[8px] self-stretch">
                <div className="self-stretch text-gray-900 text-[18px]/normal md:text-xl/normal font-semibold">
                  Universal Issuance
                </div>
                <div className="self-stretch text-gray-600 text-[14px]/normal md:text-base/normal">
                  Anyone—whether a large corporation, a small business, or an
                  independent organization—can issue Verifiable Credentials.
                  There are no restrictions, enabling a truly open and inclusive
                  credentialing system.
                </div>
              </div>
            </div>
            <div className="flex w-full md:min-w-[240px] flex-col gap-[16px] md:gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
              <img
                src="/digital.svg"
                alt="Digital"
                className="w-[48px] h-[48px]"
              />
              <div className="flex flex-col gap-[8px] self-stretch">
                <div className="self-stretch text-gray-900 text-[18px]/normal md:text-xl/normal font-semibold">
                  Digital Badges & Revocation
                </div>
                <div className="self-stretch text-gray-600 text-[14px]/normal md:text-base/normal">
                  Issue digital badges, certifications, or attestations to
                  users, and revoke them if necessary. This ensures credentials
                  remain accurate, trustworthy, and up to date.
                </div>
              </div>
            </div>
            <div className="flex w-full md:min-w-[240px] flex-col gap-[16px] md:gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
              <img
                src="/verification.svg"
                alt="Verification"
                className="w-[48px] h-[48px]"
              />
              <div className="flex flex-col gap-[8px] self-stretch">
                <div className="self-stretch text-gray-900 text-[18px]/normal md:text-xl/normal font-semibold">
                  Instant, Tamper-Proof Verification
                </div>
                <div className="self-stretch text-gray-600 text-[14px]/normal md:text-base/normal">
                  Verifiable Credentials are cryptographically signed and can be
                  instantly verified without relying on the issuer. This
                  guarantees authenticity while protecting user privacy.
                </div>
              </div>
            </div>
            <div className="flex w-full md:min-w-[240px] flex-col gap-[16px] md:gap-[20px] md:grow-1 md:shrink-0 md:basis-0">
              <img
                src="/disclosure.svg"
                alt="Disclosure"
                className="w-[48px] h-[48px]"
              />
              <div className="flex flex-col gap-[8px] self-stretch">
                <div className="self-stretch text-gray-900 text-[18px]/normal md:text-xl/normal font-semibold">
                  Selective Disclosure & Privacy Control
                </div>
                <div className="self-stretch text-gray-600 text-[14px]/normal md:text-base/normal">
                  Users decide what information to share, revealing only the
                  necessary details while keeping the rest of their data
                  private. Advanced cryptographic techniques ensure security and
                  compliance with privacy standards.
                </div>
              </div>
            </div>
          </div>

          {/* Mockup section - positioned below on mobile */}
          <div className="relative w-full md:w-[560px] bg-gray-100 py-[48px] md:py-[56px] px-[24px] md:pl-[40px] rounded-[24px] max-w-full overflow-hidden">
            <img
              src="/mockup.png"
              alt="Mockup"
              className="w-full h-auto md:mr-[-32px] max-w-full object-contain"
            />
            <img
              src="/arrow.svg"
              alt="Arrow"
              className="hidden md:block absolute -top-[150px] left-[50px]"
            />
          </div>
        </div>
      </div>

      {/* "We've helped hundreds of global companies" Section */}
      <div className="flex flex-col py-[48px] md:py-[96px] items-center gap-[32px] md:gap-[64px] w-full overflow-hidden">
        <div className="flex max-w-[1280px] px-[16px] md:px-[32px] w-full flex-col gap-[32px] md:gap-[64px]">
          <div className="flex flex-col md:flex-row justify-between gap-y-[24px] md:gap-y-[32px] flex-wrap">
            <div className="flex min-w-[280px] md:min-w-[480px] max-w-full md:max-w-[768px] flex-col gap-[16px] md:gap-[20px] grow-1 shrink-0 basis-0">
              <div className="self-stretch text-gray-900 text-[24px]/[32px] md:text-[36px]/[44px] font-semibold -tracking-[0.72px]">
                We&apos;ve helped hundreds of global companies
              </div>
              <div className="self-stretch text-gray-600 text-[16px]/normal md:text-xl/normal">
                Hear from some of our amazing customers who are automating their
                finances.
              </div>
            </div>
            <Link
              href="https://my.idntty.io/account/type"
              className="flex justify-center md:justify-start w-full md:w-auto"
            >
              <Button
                size="xl"
                className="self-center md:self-start w-full md:w-auto"
              >
                Create IDNTTY
              </Button>
            </Link>
          </div>
          <Carousel className="flex flex-col gap-[24px] md:gap-[32px] w-full px-[16px] md:px-0 overflow-x-hidden">
            <CarouselContent className="overflow-visible gap-[16px]">
              <CarouselItem className="basis-[200px] md:basis-[220px] lg:basis-[240px] shrink-0 grow-0">
                <div className="flex justify-center">
                  <Widget
                    size="tiny"
                    type="link-text"
                    value='{"text": "Women Who Code", "linkUrl": "https://womenwhocode.com"}'
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-[200px] md:basis-[220px] lg:basis-[240px] shrink-0 grow-0">
                <div className="flex justify-center">
                  <Widget
                    size="tiny"
                    type="link-text"
                    value='{"text": "CSI", "linkUrl": "https://www.controlsi.co.za/"}'
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-[200px] md:basis-[220px] lg:basis-[240px] shrink-0 grow-0">
                <div className="flex justify-center">
                  <Widget
                    size="tiny"
                    type="link-text"
                    value='{"text": "La Crème", "linkUrl": "https://www.lacreme.kz/"}'
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-x-[16px] md:gap-x-[32px]">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="flex flex-col py-[48px] md:py-[96px] items-center gap-[32px] md:gap-[64px] w-full overflow-x-hidden">
        <div className="flex flex-col w-full max-w-[1280px] px-[16px] md:px-[32px] gap-[24px] md:gap-[32px] items-center">
          <div className="w-full max-w-full md:max-w-[768px] flex flex-col items-center gap-[16px] md:gap-[20px]">
            <div className="self-stretch text-center text-gray-900 text-[24px]/[32px] md:text-[36px]/[44px] font-semibold -tracking-[0.72px]">
              Frequently asked questions
            </div>
            <div className="self-stretch text-center text-gray-600 text-[16px]/normal md:text-xl/normal">
              Everything you need to know about the product and billing.
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-[1280px] px-[16px] md:px-[32px] items-center gap-[40px] md:gap-[64px]">
          <Accordion
            type="multiple"
            className="flex w-full max-w-full md:max-w-[768px] flex-col gap-[16px]"
          >
            <AccordionItem
              value="account-types"
              className="max-w-full overflow-hidden break-words"
            >
              <AccordionTrigger className="text-left break-words hyphens-auto">
                What types of digital identity are there and what are the
                differences?
              </AccordionTrigger>
              <AccordionContent className="break-words">
                - There are two types of digital identity: public (authority)
                and private (identity).
                <br />
                - Public (authority): Designed for companies, communities, and
                organizations. All information is public, and these entities can
                issue digital badges.
                <br />- Private (identity): Designed for individuals. You
                control what information is visible and to whom, allowing
                selective sharing of personal data.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="validation"
              className="max-w-full overflow-hidden break-words"
            >
              <AccordionTrigger className="text-left break-words hyphens-auto">
                Who can validate my private data??
              </AccordionTrigger>
              <AccordionContent className="break-words">
                Anyone in the network can validate your data. However, if you
                modify your data, all previous validations are reset, and new
                validations will be required.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="billing"
              className="max-w-full overflow-hidden break-words"
            >
              <AccordionTrigger className="text-left break-words hyphens-auto">
                How and what am I paying for?
              </AccordionTrigger>
              <AccordionContent className="break-words">
                You use platform tokens to pay for activities related to
                storing, modifying, and confirming data on the blockchain. All
                other features and services are free of charge.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="blockchain-storage"
              className="max-w-full overflow-hidden break-words"
            >
              <AccordionTrigger className="text-left break-words hyphens-auto">
                What information about me is stored on the blockchain?
              </AccordionTrigger>
              <AccordionContent className="break-words">
                We do not store any private information in clear or encrypted
                form on the blockchain (unless you choose to put it there
                yourself). Only a hash of your data is stored.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="db"
              className="max-w-full overflow-hidden break-words"
            >
              <AccordionTrigger className="text-left break-words hyphens-auto">
                What information about me is stored in your database?
              </AccordionTrigger>
              <AccordionContent className="break-words">
                Your data is stored encrypted with your private key. Even we
                cannot read or recover it without your key. That&apos;s why we
                strongly recommend keeping your key safe. All encryption and
                decryption happen in your browser.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="account-recovery"
              className="max-w-full overflow-hidden break-words"
            >
              <AccordionTrigger className="text-left break-words hyphens-auto">
                Can I recover my account if I lose my private key?
              </AccordionTrigger>
              <AccordionContent className="break-words">
                No, we cannot recover your account if you lose your private key.
                Since your data is encrypted with your key and we do not store a
                backup, it is impossible for anyone – including us – to retrieve
                it. We strongly recommend securely storing your private key in
                multiple safe locations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="node"
              className="max-w-full overflow-hidden break-words"
            >
              <AccordionTrigger className="text-left break-words hyphens-auto">
                Can I deploy my node?
              </AccordionTrigger>
              <AccordionContent className="break-words">
                Yes, of course! You can deploy your own node, earn tokens, and
                even become a block validator. By doing so, you contribute to
                maintaining the network and receive rewards for your
                participation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
}
