import React, { useState } from 'react';

const LuckyLoserContext = React.createContext({});

const LuckyLoserContextProvider = props => {
  const [curTab, setCurTab] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [people, setPeople] = useState([
    { id: 0, name: 'Tristan' },
    { id: 1, name: 'PJ' },
    { id: 2, name: 'Ken Tan' },
    { id: 3, name: 'Elycis' },
    { id: 4, name: 'May' },
    { id: 5, name: 'Rich' },
    { id: 6, name: 'Mich' },
    { id: 7, name: 'Bill' },
    { id: 8, name: 'Ming' },
  ]);

  const [checkedPeople, setCheckedPeople] = useState(people.map(p => ({ ...p, count: 0 })));


  return (
    <LuckyLoserContext.Provider
      value={{
        people, setPeople, checkedPeople, setCheckedPeople,
        curTab, setCurTab, gameStarted, setGameStarted,
      }}
    >
      {props.children}
    </LuckyLoserContext.Provider>
  )
};

const LuckyLoserContextConsumer = LuckyLoserContext.Consumer;

export {
  LuckyLoserContext,
  LuckyLoserContextProvider,
  LuckyLoserContextConsumer,
};
