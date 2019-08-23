import React, { useState } from 'react';

const LuckyLoserContext = React.createContext({});

const LuckyLoserContextProvider = props => {
  const [curTab, setCurTab] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
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

  const [checkedPeople, setCheckedPeople] =
    useState(people.map(p => ({ ...p, count: 0 })));

  const [gameData, setGameData] = useState('');



  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function sleep(ms, string) {
    return (
      new Promise((resolve, reject) => {
        let wait = setTimeout( async () => {
          clearTimeout(wait);
          if (string) {
            setGameData(string);
          }
          resolve(string)
        }, ms)
      })
    );
  }

  async function resetGame () {
    const newPeople = await checkedPeople.map(p => ({
      id: p.id,
      name: p.name,
      count: 0,
    }));
    await setCheckedPeople(newPeople);
    setGameStarted(false);
    setGameFinished(false);
  }

  const playGame = async () => {
    await setCheckedPeople(await shuffle(checkedPeople));
    setGameStarted(true);
    let count = 0;
    while (!checkedPeople.find(p => p.count >= 3)) {
      let newPeople = [...checkedPeople];
      const random = await Promise.all([
        Math.floor(Math.random() * checkedPeople.length),
        sleep(count === 0 ? 0 : 800),
        sleep(count === 0 ? 800 : 1600, '3...'),
        sleep(count === 0 ? 1600 : 2400, '2...'),
        sleep(count === 0 ? 2400 : 3200, '1...'),
      ]);
      count += 1;
      const randomInt = random[0];
      newPeople[randomInt].count += 1;
      await sleep(1000, newPeople[randomInt].name);
      setCheckedPeople(newPeople);
    }
    setGameFinished(true);
  }

  return (
    <LuckyLoserContext.Provider
      value={{
        people, setPeople, checkedPeople, setCheckedPeople,
        curTab, setCurTab, gameStarted, setGameStarted,
        playGame, gameData, gameFinished, setGameFinished,
        resetGame,
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
