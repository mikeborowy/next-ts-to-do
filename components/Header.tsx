import React from 'react';
import Link from 'next/link';

export const defaultTitle = 'irport Departures';

interface IHeader {
  title: string
}

export const Header: React.FunctionComponent<IHeader> = () => {
  return (
    <header>
      <Link href="/">
        <a>
          <img src="/static/logo.png" />
        </a>
      </Link>
      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          margin: 0 0 20px;
        }
        img {
          width: 100px;
        }
      `}</style>
    </header>
  );
};
