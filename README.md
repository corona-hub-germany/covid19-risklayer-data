# covid19-risklayer-data

A npm module to load covis-19 case-data from a risklayer source

## Setup

```sh
npm install --save-dev covid19-risklayer-data
```

## Usage

To have access to the google-docs API you'll need to create personal credentials.
This process is explained in the [here](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account).

## Data 

The following fields are returned if they exists:

* GEN
* BEZ
* AGS
* cases
* immune
* quarantine
* intensive
* deaths
* time

## Example

```js
const { getCopyright, getData } = require('./src/risklayerDoc');

(async () => {
	const coyright = getCopyright();
	console.log(`Copyright: ${coyright}\n`);

	const data = await getData({
		clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		privateKey: process.env.GOOGLE_PRIVATE_KEY,
	});

	console.log(`First dataset: ${JSON.stringify(data[0], null, 2)}\n`);
})();
```

Output:
```
First dataset: {
  "GEN": "Dithmarschen",
  "BEZ": "Kreis",
  "AGS": 1051,
  "cases": 12,
  "quarantine": 11,
  "time": 43911.61415241898
}
```

## License

AGPL-3.0-or-later

Copyright 2020 by Alexander Wunschik <dev@wunschik.net> and contributors

