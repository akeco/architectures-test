import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar as NavbarComponent,
  Button,
  Alignment,
  InputGroup,
  Popover,
  Menu,
  MenuItem,
  Position,
  MenuDivider
} from '@blueprintjs/core';
import ProductDialog from '../Dialogs/ProductDialog';
import style from './style.module.scss';

const Navbar = (props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <Fragment>
      <ProductDialog open={open} onClose={onClose} />
      <NavbarComponent className={'bp3-dark'}>
        <div className={style.wrapper}>
          <NavbarComponent.Group align={Alignment.LEFT}>
            <Button className="bp3-minimal">
              <Link to={'/'}>Shops</Link>
            </Button>
            <Button className="bp3-minimal">
              <Link to={'/products'}>Products</Link>
            </Button>
          </NavbarComponent.Group>
          <div className={style.centerSearch}>
            <Button icon="add" className={style.openDialogButton} onClick={onOpen} />
            <InputGroup type="search" placeholder="Search products..." />
          </div>
          <div className={style.moveRight}>
            <Popover
              content={
                <Menu>
                  <MenuItem icon="cog" text="My Account" />
                  <MenuDivider />
                  <MenuItem icon="log-out" text="Logout" />
                </Menu>
              }
              position={Position.BOTTOM}
            >
              <Button className="bp3-minimal" icon="user" />
            </Popover>
          </div>
        </div>
      </NavbarComponent>
    </Fragment>
  );
};

export default Navbar;
