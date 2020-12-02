import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../Navigation/NavbarStyle';
import { search } from '../../actions';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';

function Search() {
  const classes = useStyles();
  const history = useHistory();
  const { list } = useSelector((state) => state.search);
  const change = (e) => search(e.target.value);
  console.log(list);
  const select = (e, v, r) => {
    if (r === 'select-option') history.push(`/profile/${v.id}`);
  };
  return (
    <Autocomplete
      freeSolo
      id='search-autocomplete-combo'
      options={list || []}
      getOptionLabel={(o) => o.name}
      onInputChange={change}
      onChange={select}
      debug={true}
      renderInput={(params) => (
        <div className={classes.search} ref={params.InputProps.ref}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            {...params.inputProps}
          />
        </div>
      )}
    />
  );
}

export default Search;
