import React from 'react';

export const defaultTitle = 'irport Departures';

interface IHeader {
  title: string
}

export const Header = (props: IHeader) => {
  return (
    <div>
      {props.title}
    </div>
  )
}