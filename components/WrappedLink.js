import Link, { LinkProps } from "next/link";
import { forwardRef, PropsWithChildren } from "react";

const WrappedLink = forwardRef(({ className, children, ...props }, ref) => (
  <Link {...props}>
    <a className={className} ref={ref}>
      {children}
    </a>
  </Link>
));

export default WrappedLink;
