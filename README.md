# ErgoWatch front-end

A web app to explore ErgoWatch data.

## Running a local instance

You'll need node installed as well as access (i.e. credentials) to an ErgoWatch database.

### Get the code

```bash
git clone https://github.com/abchrisxyz/ergowatch-fe
```

### Install dependencies

```bash
cd ergowatch-fe
npm install
```

### Prepare a local .env file

The app expects some build-time variables to be set.
This is done by placing a `.env` file in the root dir (`ergowatch-fe`)

```
echo PUBLIC_EW_API_ROOT=http://your.ergo.watch > .env
echo EW_PG_HOST=some_host >> .env
echo EW_PG_PORT=5432 >> .env
echo EW_PG_USER=some_user >> .env
echo EW_PG_NAME=ew >> .env
echo EW_PG_PASS=some_pw >> .env
```

### Run

```bash
npm run preview

# Or
npm run build
node build
```

The app should now be running on [http:localhost:3000](http:localhost:3000).

## Developing

Once you've installed dependencies, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
