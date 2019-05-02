import React from 'react'

/*
 * Dropdown & DropdownMenu
 *
 * Usage:
 *   <Dropdown>
 *     <button onClick={() => this.setState({open: true})}>Fire!</button>
 *     <DropdownMenu width={200} open={this.state.open}>
 *      <div>Option 1</div>
 *      <div>Option 2</div>
 *     </DropdownMenu>
 *   </Dropdown>
 */
export const Dropdown = ({children, className}) => (
  <div className={`inline-block align-top ${className}`}>
    {children}
  </div>
)

// Invisible click grabber, to detect when the user clicks away.
const Overlay = ({onClick}) => {
  return (
    <div onClick={onClick} style={{
      position: 'fixed',
      zIndex: 999,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0}} data-id='dropdown-overlay' />
  )
}

// `open` is used to show and hide the menu
// `top` is used to move the menu and arrow down.
const Container = ({open, top = 0, children}) => (
  <div style={{
    display: open ? null : 'none',
    position: 'relative',
    top
  }} data-id='dropdown-menu'>
    {children}
  </div>
)

// An arrow tip that appears at the top middle of the dropdown menu
const MenuArrowUp = ({height, boxShadow = '0px 1px 10px 0px rgba(0,0,0,0.20)', background = 'white', align = 'center', marginLeft = 'auto', marginRight = 'auto'}) => {
  const side = Math.round(Math.sqrt(2) * height)

  return (
    <div style={{
      zIndex: 600,
      position: 'absolute',
      width: '100%',
      height: `${height}px`,
      top: `-${height}px`,
      textAlign: align,
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'inline-block',
        position: 'relative',
        width: `${side}px`,
        height: `${side}px`,
        transform: `translate(0, ${height / 2}px) rotate(45deg)`,
        borderRadius: '2px 0 0 0',
        background: background,
        left: marginLeft,
        right: marginRight,
        boxShadow: boxShadow
      }} />
    </div>
  )
}

// An arrow tip that appears at the bottom middle of the dropdown menu
const MenuArrowDown = ({height, boxShadow = '0px 1px 10px 0px rgba(0,0,0,0.20)', background = 'white', align = 'center', marginLeft = 'auto', marginRight = 'auto'}) => {
  const side = Math.round(Math.sqrt(2) * height)

  return (
    <div style={{
      zIndex: 600,
      width: '100%',
      height: `${height + 5}px`,
      textAlign: align,
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'inline-block',
        position: 'relative',
        width: `${side}px`,
        height: `${side}px`,
        transform: `translate(0, ${height / 2}px) rotate(45deg)`,
        borderRadius: '2px 0 0 0',
        background: background,
        boxShadow: boxShadow,
        top: `-${height + 2}px`,
        left: marginLeft,
        right: marginRight,
        zIndex: 601
      }} />
    </div>
  )
}

// `width` forces the width of the Menu.
//         width is required to make other calculaitons possible.
// `left` is the pixels from the left edge of the trigger element...
//        centered by default.
//        `left={0}` would make the left of the menu inline with the left of the
//         trigger element.
const MenuPosition = ({ width, left = `calc(50% - ${width / 2}px)`, translateX, translateY, children }) => (
  <div style={{
    position: 'absolute',
    width: `${width}px`,
    left,
    transform: `translateX(${translateX}px) translateY(${translateY}px)`,
    zIndex: 9999
  }}>
    {children}
  </div>
)

// Styling for the dropdown box and shadow, and reset positon to relative.
const Menu = ({boxShadow = '0px 1px 10px 0px rgba(0,0,0,0.20)', background = 'white', className, children}) => (
  <div style={{
    position: 'relative',
    textAlign: 'left',
    zIndex: 500,
    background: background,
    boxShadow: boxShadow
  }} className={className}>
    {children}
  </div>
)

export const DropdownMenu = ({ open, boxShadow, className, background, translateX = 0, translateY = 0, width, left, top = 0, arrowHeight = 12, arrowPosition = 'top', arrowAlign, arrowMarginLeft, arrowMarginRight, onDismiss, alignRight, children }) => {
  if (alignRight) {
    left = `calc(100% - ${width}px)`
    arrowAlign = 'right'
    arrowMarginRight = arrowMarginRight || '13px'
  }
  return (
    <Container open={open} top={top + arrowHeight}>
      <Overlay onClick={onDismiss} />
      <MenuPosition width={width} left={left} translateX={translateX} translateY={translateY}>
        {arrowPosition === 'top' && <MenuArrowUp boxShadow={boxShadow} background={background} height={arrowHeight} align={arrowAlign} marginLeft={arrowMarginLeft} marginRight={arrowMarginRight} />}
        <Menu className={className} boxShadow={boxShadow} background={background}>
          {open ? children : null}
        </Menu>
        {arrowPosition === 'bottom' && <MenuArrowDown boxShadow={boxShadow} background={background} height={arrowHeight} align={arrowAlign} marginLeft={arrowMarginLeft} marginRight={arrowMarginRight} />}
      </MenuPosition>
    </Container>
  )
}
