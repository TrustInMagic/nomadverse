import * as React from 'react';
// mui
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateIcon from '@mui/icons-material/Create';
import CategoryIcon from '@mui/icons-material/Category';
// next
import { useRouter } from 'next/navigation';
// -------------------------------------------------- //

const actions = [
  { icon: <CreateIcon />, name: 'Writer Suite' },
  { icon: <CategoryIcon />, name: 'Create Category' },
];

export default function RoundedButton() {
  const router = useRouter();

  const onActionClick = (action: string) => {
    if (action === 'Writer Suite') {
      router.push('/chronicle/create');
    }
    if (action === 'Create Category') {
      router.push('/category/create');
    }
  };

  return (
    <Box
      sx={{
        height: 320,
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'fixed',
        left: 8,
        bottom: 8,
      }}
    >
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'fixed', bottom: 2, left: 2 }}
        icon={<SpeedDialIcon />}
        FabProps={{
          sx: {
            bgcolor: 'secondary.main',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => onActionClick(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
