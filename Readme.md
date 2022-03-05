# To make a client(React) in typescript

1. create a react application. Can use anything create-react-app or vite.
2. Using Vite - `npm init vite@latest`
3. Select typescript from options then cd into the newly created folder and do npm install
4. Install sass using npm i -D sass

# To make a server in typescript

1. `npm init`
2. `npm install express`
3. `npm i -D @types/express @types/node nodemon ts-node-dev typescript`
4. Add in package.json file in scripts - `"dev": "nodemon src/index.ts"`
5. Create a tsconfig.json file with following data

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "rootDir": "./",
    "esModuleInterop": true
  }
}
```

6. Create a folder <b>src</b> and create an index.ts file
7. Add the following code in this file:

```tsx
import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('Hello World'))

app.listen(8000, () => {
  console.log('Listening to Port 8000')
})
```
