import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Bookmark,
  HeartRounded,
  User01,
  Flag01,
  Phone,
  Mail01,
  Link01,
} from 'untitledui-js/react';
import lookup from 'country-code-lookup';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';

import { cn, calculateAge, getFlagEmoji } from '../lib/utils';
import type { GridItemContent } from '../types';
import WidgetIcon from './widget-icon';

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
        website: 'border border-brand-200 hover:border-orange-500',
        whatsapp: 'border border-brand-200 hover:border-orange-500',
        badge: 'hover:border hover:border-orange-500 overflow-hidden',
        image: 'hover:border hover:border-orange-500 overflow-hidden',
        'link-image': 'hover:border hover:border-orange-500 overflow-hidden',
        'link-text': 'border border-brand-200 hover:border-orange-500',
        other: 'border border-brand-200 hover:border-orange-500',
        new: 'border-[5px] border-orange-500',
      },
      size: {
        tiny: 'w-[180px] h-[180px]',
        long: 'w-[400px] h-[180px]',
        tall: 'w-[180px] h-[400px]',
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
  isEditable?: boolean;
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
  ({ className, type, size, value, state, isEditable, ...props }, ref) => {
    // FIXME: Needs a rewrite
    switch (type) {
      case 'name':
      case 'other':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className
            )}
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
      case 'website': {
        const url = value?.toString() ?? '';
        const displayUrl = url.replace(/^https?:\/\/(www\.)?/, '');
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={Link01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <div className="text-center text-3xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              <Link
                href={url.startsWith('http') ? url : `https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {size !== 'tiny' && size !== 'tall' ? displayUrl : '🔗'}
              </Link>
            </div>
          </div>
        );
      }
      case 'phone':
      case 'email':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className
            )}
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
            className={cn(
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={Bookmark}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <div className="text-center text-base font-medium -tracking-[0.2px] text-gray-900">
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
              isEditable && 'select-none',
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
      case 'location': {
        const sizeParam =
          size === 'tiny'
            ? '180x180'
            : size === 'long'
            ? '400x180'
            : size === 'tall'
            ? '180x400'
            : '400x400';
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              className,
              'overflow-hidden'
            )}
            ref={ref}
            {...props}
          >
            <WidgetIcon
              Icon={Flag01}
              strokeClassName="stroke-gray-900 group-hover:stroke-orange-500"
            />
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${value?.toString()},10,0,50/${sizeParam}@2x?access_token=pk.eyJ1IjoiYWxleGFqYXgiLCJhIjoiY2xpNWRkZThmMXR1dzNwbXYxZjl0Y211OCJ9.NTosCJOTjWY3mjFtW1OaGw`}
              alt="Map"
              className="object-cover"
            />
          </div>
        );
      }
      case 'linkedin': {
        const username = value?.toString() ?? '';
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'bg-linkedin p-4 text-white',
              isEditable && 'select-none',
              className
            )}
            ref={ref}
            {...props}
          >
            <Link
              href={`https://www.linkedin.com/in/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white"
            >
              View LinkedIn profile ↗
            </Link>
          </div>
        );
      }
      case 'hobby':
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              'relative flex flex-col gap-2 overflow-hidden p-4',
              isEditable && 'select-none',
              className
            )}
            ref={ref}
            {...props}
          >
            <img
              src={`https://d1nyjrmwcoi38d.cloudfront.net/hobby/${(
                value?.toString() ?? 'default'
              ).toLowerCase()}.png`}
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
              isEditable && 'select-none',
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
      case 'badge': {
        // Ensure badge URLs always include the '/badges/' path
        const badgeUrl = (() => {
          const url = value?.toString() ?? '';
          // If URL already has '/badges/' path, use it as is
          if (url.includes('/badges/')) {
            return url;
          }
          // For backward compatibility with old URLs that may contain just the filename
          // or URLs returned from the backend without the badges/ folder
          if (url.startsWith('https://d1nyjrmwcoi38d.cloudfront.net/')) {
            // Extract the last part after the domain
            const path = url.split('https://d1nyjrmwcoi38d.cloudfront.net/')[1];
            // If path contains slashes but not '/badges/', likely a full path like 'badges/something'
            if (path.includes('/') && !path.includes('badges/')) {
              return url; // It has a different path structure, leave it alone
            }
            // Add badges/ prefix if it's just a filename with no folder
            if (!path.includes('/')) {
              return `https://d1nyjrmwcoi38d.cloudfront.net/badges/${path}`;
            }
          }
          return url;
        })();

        return (
          <div
            className={cn(widgetVariants({ type, size, state }), className)}
            ref={ref}
            {...props}
          >
            <img src={badgeUrl} alt="badge" className="object-cover" />
          </div>
        );
      }
      case 'image': {
        // Ensure this is truly an image, not a badge with incorrect type
        const imageUrl = value?.toString() ?? '';
        const isBadgeUrl =
          imageUrl &&
          !imageUrl.includes('/images/') &&
          (imageUrl.includes('/badges/') ||
            (imageUrl.startsWith('https://d1nyjrmwcoi38d.cloudfront.net/') &&
              !imageUrl.includes('/')));

        // If it appears to be a badge URL but has image type, still render as an image
        // but log a warning for debugging
        if (isBadgeUrl) {
          console.warn(
            'Image widget has a URL that looks like a badge URL:',
            imageUrl
          );
        }

        return (
          <div
            className={cn(widgetVariants({ type, size, state }), className)}
            ref={ref}
            {...props}
          >
            <img src={imageUrl} alt="custom image" className="object-cover" />
          </div>
        );
      }
      case 'link-image':
        try {
          const content = value?.toString() ?? '{}';
          // Define interface for the parsed content
          interface LinkImageContent {
            imageUrl: string;
            linkUrl: string;
          }
          const { imageUrl, linkUrl } = JSON.parse(content) as LinkImageContent;
          return (
            <div
              className={cn(widgetVariants({ type, size, state }), className)}
              ref={ref}
              {...props}
            >
              <Link
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full w-full"
              >
                <img
                  src={imageUrl}
                  alt="clickable image"
                  className="object-cover"
                />
              </Link>
            </div>
          );
        } catch (error) {
          console.error('Error parsing link-image content', error);
          return (
            <div
              className={cn(widgetVariants({ type, size, state }), className)}
              ref={ref}
              {...props}
            >
              <div className="flex h-full w-full items-center justify-center p-4 text-center text-gray-500">
                Invalid image link format
              </div>
            </div>
          );
        }
      case 'link-text':
        try {
          const content = value?.toString() ?? '{}';
          // Define interface for the parsed content
          interface LinkTextContent {
            text: string;
            linkUrl: string;
          }
          const { text, linkUrl } = JSON.parse(content) as LinkTextContent;
          return (
            <div
              className={cn(widgetVariants({ type, size, state }), className)}
              ref={ref}
              {...props}
            >
              <Link
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <div className="text-center text-3xl/[38px] font-bold -tracking-[0.2px] text-gray-900 hover:text-orange-500">
                  {text}
                </div>
              </Link>
            </div>
          );
        } catch (error) {
          console.error('Error parsing link-text content', error);
          return (
            <div
              className={cn(widgetVariants({ type, size, state }), className)}
              ref={ref}
              {...props}
            >
              <div className="flex h-full w-full items-center justify-center p-4 text-center text-gray-500">
                Invalid text link format
              </div>
            </div>
          );
        }
      case 'whatsapp': {
        const phone = (value?.toString() ?? '').replace('+', '');
        const whatsappUrl = `https://wa.me/${phone}`;
        return (
          <div
            className={cn(
              widgetVariants({ type, size, state }),
              isEditable && 'select-none',
              className
            )}
            ref={ref}
            {...props}
          >
            <div className="text-center text-3xl/[38px] font-bold -tracking-[0.2px] text-gray-900">
              <SocialIcon
                url={whatsappUrl}
                network="whatsapp"
                style={{
                  height: size !== 'tiny' && size !== 'tall' ? 64 : 48,
                  width: size !== 'tiny' && size !== 'tall' ? 64 : 48,
                }}
                target="_blank"
              />
            </div>
          </div>
        );
      }
    }
  }
);
Widget.displayName = 'Widget';

export default Widget;
