/**
 * For this to work you need a *.env" file in the save directory 
 * containing the variables:
 * 
 * GOOGLE_SERVICE_ACCOUNT_EMAIL
 * GOOGLE_PRIVATE_KEY
 * 
 * @see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account
 */
require('dotenv').config();


const { getCopyright, getData } = require('./src/risklayerDoc');

(async () => {
	const coyright = getCopyright();
	console.log(`Copyright: ${coyright}\n`);

	const data = await getData({
		clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		privateKey: process.env.GOOGLE_PRIVATE_KEY,
	});

	console.log(`dataset length: ${data.length}\n`);

	console.log(`First dataset: ${JSON.stringify(data[0], null, 2)}\n`);
	
	console.log(`Last dataset: ${JSON.stringify(data[data.length-1], null, 2)}\n`);
})();
