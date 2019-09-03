import React, { useContext } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { LuckyLoserContext } from '../../../contexts/LuckyLoserContext';

const PeopleList = () => {
  const { gameStarted, people, checkedPeople, setCheckedPeople } = useContext(
    LuckyLoserContext
  );
  const peopleList = !gameStarted
    ? people
    : checkedPeople.sort((a, b) => b.count - a.count);
  return (
    <List>
      {peopleList.map(value => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
            role={undefined}
            dense={!gameStarted}
            button
            onClick={() => {
              const exists = checkedPeople.find(p => p.id === value.id);
              if (!gameStarted) {
                if (exists) {
                  setCheckedPeople(
                    checkedPeople.filter(p => p.id !== value.id)
                  );
                } else {
                  setCheckedPeople([...checkedPeople, { ...value, count: 0 }]);
                }
              }
            }}
          >
            {!gameStarted && (
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={
                    checkedPeople.find(p => p.id === value.id) ? true : false
                  }
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
            )}
            <ListItemText
              id={labelId}
              primary={`${value.name}${gameStarted ? ` - ${value.count}` : ''}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default PeopleList;
