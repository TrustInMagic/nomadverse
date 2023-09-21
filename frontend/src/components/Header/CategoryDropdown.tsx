'use client';

import React from 'react';
// mui
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// utils
import capitalizeWord from '../../../utils/capitalizeWord';
import shuffle from '../../../utils/shuffleArray';
// components
import ChronicleGlimpse from './ChronicleGlimpse';
// next
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
// custom hooks
import { useDataContext } from '@/providers/DataProvider';
// -------------------------------------------------- //

type Anchor = 'top';

export default function CategoryDropdown() {
  const [state, setState] = React.useState({ top: false });
  const [selectedCategory, setSelectedCategory] = React.useState<null | string>(
    null
  );

  const { categories, chronicles } = useDataContext();

  const router = useRouter();
  const params = useParams();

  React.useEffect(() => {
    const { category } = params;
    if (category) {
      setSelectedCategory(category as string);
    } else {
      setSelectedCategory(null);
    }
  }, [params]);

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const textContent = target.textContent;

    if (textContent) {
      setSelectedCategory(textContent);
      router.push(`/category/${textContent.toLowerCase()}`);
    }
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 'auto' }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem sx={{ marginBottom: '-20px' }}>
          <ListItemText primary='Topics' sx={{ color: 'gray' }} />
        </ListItem>
      </List>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.name}
            disablePadding
            className={`${
              selectedCategory === category.name
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
    </Box>
  );

  const shuffledChronicles = shuffle(chronicles);

  return (
    <div className='max-300:hidden'>
      {(['top'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            color='secondary'
            size='small'
          >
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
              <div className='flex flex-col gap-4 max-460:hidden'>
                {shuffledChronicles.slice(0, 2).map((chronicle) => (
                  <ChronicleGlimpse
                    key={chronicle.title}
                    chronicle={chronicle}
                    closeDrawer={setState}
                  />
                ))}
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
