import { SVGProps, RefAttributes } from 'react';
import { SVGMotionProps, motion } from 'motion/react';

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
type Motion = typeof motion;
export interface UntitledProps extends ElementAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
  color?: string;
  strokeWidth?: number;
  animation?: {
    motion: Motion;
    attributes?: {
      svg?: Omit<SVGMotionProps<SVGSVGElement>, keyof SVGProps<SVGSVGElement>>;
      path?: Omit<
        SVGMotionProps<SVGPathElement>,
        keyof SVGProps<SVGPathElement>
      >;
    };
  };
}
