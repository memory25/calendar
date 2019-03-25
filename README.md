# Calendar、DatePicker

## Component

<Calendar date={new Date()} onSelect={function} />;

| Name     |              Type               |  Default   |                    Description                    |
| -------- | :-----------------------------: | :--------: | :-----------------------------------------------: |
| date     |             object              | new Date() |   You can pass a Date or default is new Date()    |
| onSelect | function({year,month,date,day}) |            | when select a day, you can see log in F12 console |

DatePicker formatter (YYYY-MM-DD).
You can just modify only one Number(Y or M or D) at the same time

## Toolchain

The build environment is Node, and tools are generally of the npm ecosystem. The code is transpiled/polyfilled/etc. with Babel from ES6, managed with Webpack.

#### `You must have NodeJS environment`

#### `npm`

Install node modules:

```bash
npm install
```

All that's necessary to get an environment running, with a simple server to send the application and assets:

```bash
npm run web
```

The filesystem will be watched for changes, and will be served on
`http://localhost:8010/`.

#### `build`

Build code

```bash
npm run build
```

#### `eslint`

Check code style

```bash
npm run lint
```
