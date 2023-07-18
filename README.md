# Battleship

## How to run the app:

1. Clone this repo

```
git clone https://github.com/mikepetrusha/battleship.git
```

2. Open the directory in code editor
3. Run `$ cd client`
4. Run `$ npm install` to install all the dependencies
5. Run app with `$ npm run dev` to run the app in your browser
6. Run `$ cd server`
7. Run app with `$ npm run start` to run server

## Additional scripts
- `$ npm run test` runs the tests
- `$ npm run build` builds the app for production

## Application stack
- React
- TypeScript
- Redux
- Node.js
- Soket.IO
- styled-components
- moment

## Folders structure
```
📦src
 ┣ 📂Components
 ┃ ┣ 📂Display
 ┃ ┃ ┣ 📂Board
 ┃ ┃ ┃ ┣ 📂BoardButtons
 ┃ ┃ ┃ ┃ ┣ 📜BoardButtons.styles.ts
 ┃ ┃ ┃ ┃ ┗ 📜BoardButtons.tsx
 ┃ ┃ ┃ ┣ 📂Coordinate
 ┃ ┃ ┃ ┃ ┣ 📜Coordinate.styles.ts
 ┃ ┃ ┃ ┃ ┣ 📜Coordinate.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CoordinateLabelList.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CoordinateLabelListItem.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CoordinateList.tsx
 ┃ ┃ ┃ ┃ ┗ 📜CoordinateListItem.tsx
 ┃ ┃ ┃ ┣ 📜Board.styles.ts
 ┃ ┃ ┃ ┣ 📜Board.tsx
 ┃ ┃ ┃ ┗ 📜Overlay.tsx
 ┃ ┃ ┣ 📜Display.styles.ts
 ┃ ┃ ┗ 📜Display.tsx
 ┃ ┣ 📂Log
 ┃ ┃ ┣ 📜Log.styles.ts
 ┃ ┃ ┣ 📜LogList.tsx
 ┃ ┃ ┣ 📜LogListItem.tsx
 ┃ ┃ ┗ 📜NewGameButton.tsx
 ┃ ┗ 📜Heading.tsx
 ┣ 📂hooks
 ┃ ┣ 📜reduxHooks.ts
 ┃ ┣ 📜useGame.ts
 ┃ ┗ 📜useScrollToBottom.ts
 ┣ 📂store
 ┃ ┣ 📂game
 ┃ ┃ ┗ 📜game.slice.ts
 ┃ ┗ 📜store.ts
 ┣ 📂types
 ┃ ┗ 📜types.ts
 ┣ 📂utils
 ┃ ┣ 📜utils.test.ts
 ┃ ┗ 📜utils.ts
 ┣ 📜App.tsx
 ┣ 📜constants.ts
 ┣ 📜main.styles.ts
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## Application

![image](https://github.com/mikepetrusha/battleship/assets/87857659/5a232a43-d5a6-4a3e-9805-7bcd9601afaa)

![image](https://github.com/mikepetrusha/battleship/assets/87857659/b63b23f2-62ba-42fb-b97e-1025548210d5)

![image](https://github.com/mikepetrusha/battleship/assets/87857659/dd6f8099-dc73-4539-8a38-47776023fb7b)

![image](https://github.com/mikepetrusha/battleship/assets/87857659/b16bd0d3-a4b6-4aae-8461-5fe77e2ef27b)


