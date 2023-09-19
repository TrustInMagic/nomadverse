import React from 'react';
// mui
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
// next
import { useRouter } from 'next/navigation';
// -------------------------------------------------- //

export default function CustomSearchField({
  setExpandedSearch,
}: {
  setExpandedSearch: (bool: boolean) => void;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    setIsExpanded(true);
  }, []);

  React.useEffect(() => {
    const search = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (searchValue) {
          router.push(`/search?search=${searchValue}`);
        }
      }
    };

    window.addEventListener('keydown', search);

    return () => window.removeEventListener('keydown', search);
  }, [searchValue, router]);

  const handleSearch = () => {
    if (searchValue) {
      router.push(`/search?search=${searchValue}`);
    }
  };

  return (
    <Paper
      component='div'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 0 }}
      className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-[300px]' : 'w-0'
      }`}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Chronicles'
        onBlur={() => {
          setTimeout(() => setExpandedSearch(false), 300);
          setIsExpanded(false);
        }}
        autoFocus
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <IconButton type='button' sx={{ p: '10px' }} onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
