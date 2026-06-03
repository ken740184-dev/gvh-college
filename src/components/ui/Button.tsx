import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-[#6b0000] shadow-md",
        outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
        ghost: "hover:bg-gray-100 hover:text-accent text-primary-text",
        white: "bg-white text-primary-text hover:bg-gray-100 shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    if (href) {
      return (
        <Link 
          href={href} 
          className={buttonVariants({ variant, size, className })}
        >
          {props.children as React.ReactNode}
        </Link>
      );
    }
    
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
