/**
 * FadeIn — lightweight scroll-triggered wrapper using Framer Motion.
 *
 * Usage:
 *   <FadeIn>  children </FadeIn>                       — default fadeInUp
 *   <FadeIn variant={fadeInLeft} delay={0.1}>…</FadeIn> — custom variant / delay
 *   <FadeIn as="section" className="py-24">…</FadeIn>   — any HTML element
 */
import React from 'react';
import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { fadeInUp, viewport } from '@/lib/motion';

type MotionTag = keyof typeof motion;

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView'> {
  as?: MotionTag;
  variant?: Variants;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export const FadeIn: React.FC<FadeInProps> = ({
  as = 'div',
  variant = fadeInUp,
  delay = 0,
  children,
  ...rest
}) => {
  const Tag = motion[as] as React.ElementType;

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variant}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/**
 * FadeInStagger — wraps children so each <FadeIn> inside staggers automatically.
 *
 * Usage:
 *   <FadeInStagger>
 *     <FadeIn>item 1</FadeIn>
 *     <FadeIn>item 2</FadeIn>
 *   </FadeInStagger>
 */
import { stagger } from '@/lib/motion';

interface StaggerProps {
  as?: MotionTag;
  className?: string;
  children: React.ReactNode;
  faster?: boolean;
}

export const FadeInStagger: React.FC<StaggerProps> = ({
  as = 'div',
  children,
  faster = false,
  ...rest
}) => {
  const Tag = motion[as] as React.ElementType;
  const staggerVariant: Variants = {
    hidden:  {},
    visible: {
      transition: {
        staggerChildren: faster ? 0.05 : 0.08,
        delayChildren:   faster ? 0.02 : 0.05,
      },
    },
  };

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerVariant}
      {...rest}
    >
      {children}
    </Tag>
  );
};
