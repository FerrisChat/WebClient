# FerrisChat's Web Client
The official **web** client for FerrisChat. [Try it out!](https://app.ferris.chat)

## Rewrite in progress!
The branch you are looking at is the source code for the __rewrite__ of the web client.

### ⚠️ **WARNING:** This client is not a native client - it is a client specifically made to be run in a browser.
The official native client application repository can be found [here](https://github.com/FerrisChat/Client).
Native client builds can be found [here](https://client.ferris.chat/).

## Setup Instructions
Clone this repository using ``git``:
```shell
/> git clone https://github.com/FerrisChat/WebClient
/> cd WebClient
```

Next, install all dependencies using ``npm``:
```shell
/WebClient> npm i --include=dev
```

And finally, run ``npm run dev`` to start the development server:
```shell
/WebClient> npm run dev
```

### Building for Production
Run ``npm run build`` to build the website for production:
```shell
/WebClient> npm run build
```

You can then start the production server by running ``npm run serve``:
```shell
/WebClient> npm run serve
```
You can also set the ``dist`` directory as a webroot.
