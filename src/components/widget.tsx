'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Bookmark,
  HeartRounded,
  User01,
  Flag01,
  Phone,
  Mail01,
} from 'untitledui-js/react';
import lookup from 'country-code-lookup';
import Link from 'next/link';

import { cn, calculateAge, getFlagEmoji } from '@/lib/utils';
import WidgetIcon from './widget-icon';

type GridItemContent = string | Date;

const countryCodes = lookup.countries.map((country) => country.iso2);

const widgetVariants = cva(
  '@container group relative flex justify-center items-center shrink-0 rounded-[40px] border-solid bg-gray-25 font-widget',
  {
    variants: {
      state: {
        default: '',
        edit: 'border-[5px] border-orange-500',
        selected: 'border-[5px] border-pink-500',
      },
      type: {
        name: 'border border-brand-200 hover:border-orange-500',
        bio: 'border border-brand-200 hover:border-orange-500',
        age: 'border border-brand-200 hover:border-orange-500',
        phone: 'border border-brand-200 hover:border-orange-500',
        email: 'border border-brand-200 hover:border-orange-500',
        citizenship: 'border border-brand-200 hover:border-orange-500',
        location: 'border border-brand-200 hover:border-orange-500',
        github: 'border border-brand-200 hover:border-orange-500',
        linkedin: 'border border-brand-200 hover:border-orange-500',
        hobby: 'border border-brand-200 hover:border-orange-500',
        relationship: 'border border-brand-200 hover:border-orange-500',
        badge: 'hover:border hover:border-orange-500',
        other: 'border border-brand-200 hover:border-orange-500',
        new: 'border-[5px] border-orange-500',
      },
      size: {
        tiny: 'w-[180px] h-[180px]',
        tall: 'w-[180px] h-[400px]',
        long: 'w-[400px] h-[180px]',
        large: 'w-[400px] h-[400px]',
      },
    },
    defaultVariants: {
      type: 'name',
      state: 'default',
      size: 'tiny',
    },
  }
);

export interface WidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {
  value?: GridItemContent;
}

const expandCountryCode = (code: string, includeName: boolean) => {
  if (countryCodes.includes(code)) {
    return (
      getFlagEmoji(code) +
      (includeName ? ` ${lookup.byIso(code)?.country}` : '')
    );
  }
  return code;
};

const expandEmailPhone = (value: string, fullSize: boolean) => {
  if (value.includes('@')) {
    return (
      <Link className="no-underline" href={`mailto:${value}`}>
        {fullSize ? value : '✉️'}
      </Link>
    );
  }
  return (
    <Link className="no-underline" href={`tel:${value}`}>
      {fullSize ? value : '📞'}
    </Link>
  );
};

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, type, size, value, state, ...props }, ref) => {
    // FIXME: Needs a rewrite
    switch (type) {
      case 'name':
      case 'other':
        return (
          <div
            className={cn(widgetVariants({ type, size, state }), className)}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={User01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <div className="text-center text-3xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              {value?.toString() ?? ''}
            </div>
          </div>
        );
      case 'phone':
      case 'email':
        return (
          <div
            className={cn(widgetVariants({ type, size, state }), className)}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={type === 'phone' ? Phone : Mail01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <div className="text-center text-3xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              {expandEmailPhone(
                value?.toString() ?? '',
                size !== 'tiny' && size !== 'tall'
              )}
            </div>
          </div>
        );
      case 'bio':
        return (
          <div
            className={cn(widgetVariants({ type, size, state }), className)}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={Bookmark}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <div className="text-left text-base font-medium -tracking-[0.2px] text-gray-900 px-[20px] pt-[30px]">
              {value?.toString() ?? ''}
            </div>
          </div>
        );
      case 'age':
        return (
          <div
            className={cn(
              'flex-col gap-[5px]',
              widgetVariants({ type, size, state }),
              className
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={HeartRounded}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <div className="text-center text-7xl/[90px] font-bold -tracking-[1.44px] text-gray-900">
              {value instanceof Date
                ? calculateAge(value)
                : value
                ? calculateAge(new Date(value))
                : value?.toString() ?? ''}
            </div>
            <div className="text-center text-2xl font-normal text-gray-900">
              years old
            </div>
          </div>
        );
      case 'citizenship':
      case 'location':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),

              className
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={Flag01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <div className="text-center text-5xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              {expandCountryCode(
                value?.toString() ?? '',
                size !== 'tiny' && size !== 'tall'
              )}
            </div>
          </div>
        );
      case 'hobby': {
        const internalValue = {
          Gaming: 'gaming',
          default: 'default',
        }[value?.toString() ?? 'default'];
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'relative flex flex-col gap-2 overflow-hidden p-4',
              className
            )}
            ref={ref}
            {...props}
          >
            <img
              src={`https://d1nyjrmwcoi38d.cloudfront.net/hobby/${internalValue}.png`}
              alt={value?.toString() ?? ''}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <WidgetIcon
              Icon={User01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />

            {(size === 'long' || size === 'large') && (
              <div className="relative z-10 text-center font-sans text-4xl/[44px] font-bold -tracking-[0.72px] text-white">
                {value?.toString() ?? ''}
              </div>
            )}
          </div>
        );
      }
      case 'relationship': {
        const internalValue = {
          'Looking for Love': 'looking',
          default: 'default',
        }[value?.toString() ?? 'default'];
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'relative flex flex-col gap-2 overflow-hidden p-4',
              className
            )}
            ref={ref}
            {...props}
          >
            <img
              src={`https://d1nyjrmwcoi38d.cloudfront.net/relationship/${internalValue}.png`}
              alt={value?.toString() ?? ''}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <WidgetIcon
              Icon={HeartRounded}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />

            {(size === 'long' || size === 'large') && (
              <div className="relative z-10 text-center font-sans text-4xl/[44px] font-bold -tracking-[0.72px] text-white">
                {value?.toString() ?? ''}
              </div>
            )}
          </div>
        );
      }
      case 'badge':
        return (
          <div
            className={cn(widgetVariants({ type, size, state }), className)}
            ref={ref}
            {...props}
          >
            <img
              src={value?.toString() ?? ''}
              alt="badge"
              className="object-cover"
            />
          </div>
        );
    }
  }
);
Widget.displayName = 'Widget';

export default Widget;
