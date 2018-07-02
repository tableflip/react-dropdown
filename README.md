# React Dropdown - TABLEFLIP EDITION

A simple React dropdown menu with a fancy arrow and no dependencies

```
npm i @tableflip/react-dropdown
```

## Example

```jsx
import React from 'react'
import {Dropdown, DropdownMenu} from '@tableflip/react-dropdown'

export function FileMenu ({open, toggleOpen}) {
  return (
    <Dropdown>
      <button onClick={toggleOpen}>
        Add to IPFS
      </button>
      <DropdownMenu open={open} width={200} onDismiss={toggleOpen}>
        <nav>
          <a href='#'>Add File</a>
          <a href='#'>Add Folder</a>
          <a href='#'>Add Folder</a>
        </nav>
      </DropdownMenu>
    </Dropdown>
  )
}
```
