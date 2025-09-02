
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 150 28"
      height="28"
      role="img"
      aria-label="ROYALTY Logo"
      {...props}
    >
      <text
        x="0"
        y="22"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="#007BFF"
      >
        ROYALTY
      </text>
    </svg>
  );
}
