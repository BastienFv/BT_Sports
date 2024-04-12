import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props =
  | {
      as: 'button';
      active?: boolean;
      href?: undefined;
    }
  | {
      active?: boolean;
      href: string;
    };

export default function ResponsiveNavLink({
  active,
  href,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const classes = active
    ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-sky-500 dark:border-sky-600 text-left text-base font-medium text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/50 focus:outline-none focus:text-sky-800 dark:focus:text-sky-200 focus:bg-sky-100 dark:focus:bg-sky-900 focus:border-sky-700 dark:focus:border-sky-300 transition duration-150 ease-in-out'
    : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out';

  return (
    <div>
      {'as' in props && props.as === 'button' ? (
        <button className={classNames('w-full text-left', classes)}>
          {children}
        </button>
      ) : (
        <Link href={href || ''} className={classes}>
          {children}
        </Link>
      )}
    </div>
  );
}
