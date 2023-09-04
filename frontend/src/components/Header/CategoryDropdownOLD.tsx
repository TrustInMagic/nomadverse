'use client';

import * as React from 'react';
//components
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// http
import httpClient from '@/api/http-client';
// types
import { CategoryInterface } from '../../../../types/models';
// -------------------------------------------------- //

export default function CategoryDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [categories, setCategories] = React.useState<[] | CategoryInterface[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      const allData = await httpClient.get('');
      const { categories } = allData;
      setCategories(categories);
    })();
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='secondary'
      >
        Read ▼
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {categories.map((category) => (
          <MenuItem onClick={handleClose} key={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
