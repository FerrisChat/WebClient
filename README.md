# FerrisChat's Web Client
The official **web** client for FerrisChat.

### ⚠️ **WARNING:** This client is not a native client - it is a client specifically made to be run in a browser.
The official native client application repository can be found [here](https://github.com/FerrisChat/Client).
Native client builds can be found [here](https://client.ferris.chat/).

## Setup Instructions
Clone this repository and ``cd`` into the ``src`` directory:
```shell
/> git clone https://github.com/FerrisChat/WebClient
/> cd WebClient/src
```

Next, install all dependencies using ``npm``:
```shell
/WebClient/src> npm i --include=dev
```

And finally, run ``npm run dev`` to start the development server:
```shell
/WebClient/src> npm run dev
```

### Building for Production
Run ``npm run build`` to build the website for production:
```shell
/WebClient/src> npm run build
```

You can then start the production server by running ``npm run serve``:
```shell
/WebClient/src> npm run serve
```
You can also set the `dist` directory as a webroot.
