import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'muted';
}

export default function Badge({ children, variant = 'muted' }: Props) {
  const base =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  const styles: Record<NonNullable<Props['variant']>, string> = {
    primary: 'bg-primary/15 text-primary border border-primary/40',
    accent: 'bg-accent/15 text-accent border border-accent/40',
    muted: 'bg-slate-800/80 text-slate-300 border border-slate-700'
  };

  return <span className={`${base} ${styles[variant]}`}>{children}</span>;
}
