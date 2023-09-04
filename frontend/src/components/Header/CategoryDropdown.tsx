'use client';

import React from 'react';
// mui
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// http
import httpClient from '@/api/http-client';
// utils
import capitalizeWord from '../../../utils/capitalizeWord';
// types
import { CategoryInterface } from '../../../../types/models';
// -------------------------------------------------- //

type Anchor = 'top';

export default function CategoryDropdown() {
  const [state, setState] = React.useState({ top: false });
  const [selectedCategory, setSelectedCategory] = React.useState<null | string>(
    null
  );
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectedCategory(event.target.textContent);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 'auto' }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemText primary='Topics' sx={{ color: 'gray' }} />
        </ListItem>
      </List>
      <List>
        {categories.map((category, index) => (
          <ListItem
            key={category.name}
            disablePadding
            className={`${
              selectedCategory === capitalizeWord(category.name)
                ? 'text-purple-600 underline decoration-2'
                : ''
            }`}
          >
            <ListItemButton>
              <ListItemText
                primary={capitalizeWord(category.name)}
                onClick={handleClick}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
    </Box>
  );

  return (
    <div>
      {(['top'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} color='secondary'>
            {'Read ▼'}
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className='flex items-center gap-12'>
              <div>{list(anchor)}</div>
              <div>OMFG OMFG</div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
