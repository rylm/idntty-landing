'use client';

import * as React from 'react';
import type { UntitledProps } from '@/types';

export interface WidgetIconProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon: React.ComponentType<UntitledProps>;
  strokeClassName?: string;
}

const WidgetIcon: React.FC<WidgetIconProps> = ({ Icon, strokeClassName }) => {
  return (
    <div className="absolute left-[20px] top-[20px] z-20 flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-white">
      <Icon size="24" className={strokeClassName} />
    </div>
  );
};

export default WidgetIcon;
