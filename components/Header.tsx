import React from 'react';

export const defaultTitle = 'irport Departures';

interface IHeader {
  title: string
}

const Header = (props: IHeader) => {
  return (
    <div>
      {props.title}
    </div>
  )
}

export default Header
