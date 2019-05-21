# eBookStore_Weex

eBookStore Weex Version

Weex 初始化项目
```
$ weex create ebookstore
? Project name ebookstore
? Project description ebookstore for weex
? Author Mountain Xiang <783600983@qq.com>
? Select weex web render lts
? Babel compiler (https://babeljs.io/docs/plugins/#stage-x-experimental-presets)
stage-0
? Use vue-router to manage your view router? (not recommended) Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Set up unit tests Yes
? Should we run `npm install` for you after the project has been created? (recom
mended) npm

...

Success! Created ebookstore at /Users/mxr/Desktop/eBookStore_Weex/ebookstore

Inside that directory, you can run several commands:


npm start
Starts the development server for you to preview your weex page on browser
You can also scan the QR code using weex playground to preview weex page on native

npm run dev
Open the code compilation task in watch mode

npm run ios
(Mac only, requires Xcode)
Starts the development server and loads your app in an iOS simulator

npm run android
(Requires Android build tools)
Starts the development server and loads your app on a connected Android device or emulator

npm run pack:ios
(Mac only, requires Xcode)
Packaging ios project into ipa package

npm run pack:android
(Requires Android build tools)
Packaging android project into apk package

npm run pack:web
Packaging html5 project into `web/build` folder

npm run test
Starts the test runner

To get started:

cd ebookstore
npm start

Enjoy your hacking time!
```

由于 `.gitignore` 忽略了 `node_modules`，需要手动安装依赖包，执行以下命令，自动将 `package.json` 中的模块安装到 `node_modules` 文件夹下：
```
$ cd ebookstore && npm install
```
如果使用 `yarn` 作为安装包管理，可以使用以下命令：
```
$ cd ebookstore && yarn install
```
