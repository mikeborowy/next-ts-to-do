import React from 'react';

export const NotificationButtons: React.FunctionComponent = ({ children }) => {
  return (
    <div>
      <p>{children}</p>
      <style jsx>{`
        p {
          display: flex;
          justify-content: flex-end;
        }
        p > :global(a) {
          margin-left: 20px;
        }
      `}</style>
    </div>
  );
};