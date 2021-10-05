# Setup

Node v14.14.0 & NPM v6.14.8 installed

## Install dependencies

```shell
npm install
```

## Run sample script
```shell
npm run runSampleScript
```

## Description
The csvtojson library loads csv asynchronously. Decided to use async/await pattern because
I prefer this to promise chaining. When requiring/loading the library we must also do so asynchronously.