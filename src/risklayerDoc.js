const { GoogleSpreadsheet } = require('google-spreadsheet');
const deepmerge = require('deepmerge');

function getCopyright() {
	return "Risklayer GmbH (www.risklayer.com) and Center for Disaster Management and Risk Reduction Technology (CEDIM) at Karlsruhe Institute of Technology (KIT) and the Risklayer-CEDIM SARS-CoV-2 Crowdsourcing Contributors";
}

/**
 * 
 * param options {
 *   // see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-accountb
 *   clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
 *   privateKey: process.env.GOOGLE_PRIVATE_KEY,
 * 
 *   // the id of the goole doc
 *   docId: '1wg-s4_Lz2Stil6spQEYFdZaBEp8nWW26gVyfHqvcl8s'
 * }
 */
async function getData(options = {}) {
	options = deepmerge({
		docId: '1wg-s4_Lz2Stil6spQEYFdZaBEp8nWW26gVyfHqvcl8s',
		dataSheetId: 'Haupt',
		startRowIndex: 5,
		endRowIndex: 406,
		startColumnIndex: 0,
		endColumnIndex: 16,
		columns: {
			GEN: 0,
			BEZ: 1,
			AGS: 2,
			cases: 10,
			immune: 11,
			quarantine: 12,
			intensive: 13,
			deaths: 14,
			time: 15,
		}
	}, options);

	// spreadsheet key is the long id in the sheets URL
	var doc = new GoogleSpreadsheet(options.docId);

	// use service account creds
	await doc.useServiceAccountAuth({
		client_email: options.clientEmail,
		private_key: options.privateKey
	});

	// loads document properties and worksheets
	await doc.loadInfo();

	// use sheet title to find main-data sheet "Haupt"
	var mainSheetIndex = 0;
	var sheet = doc.sheetsByIndex[mainSheetIndex];
	while ((sheet.title !== options.dataSheetId) && (sheet.index <= doc.sheetCount)) {
		var sheet = doc.sheetsByIndex[++mainSheetIndex];
	}
	if (mainSheetIndex >= doc.sheetCount) {
		throw new Error(`Sheet "Haupt" not found.`);
	}

	await sheet.loadCells({
		startRowIndex: options.startRowIndex,
		endRowIndex: options.endRowIndex,
		startColumnIndex: options.startColumnIndex,
		endColumnIndex: options.endColumnIndex
	});

	var data = [];
	for (var row = options.startRowIndex; row <= options.endRowIndex-1; row++) {
		var entry = {};
		for (const key in options.columns) {
			const value = sheet.getCell(row, options.columns[key]).value;
			if (value) {
				//TODO: parse date-times
				entry[key] = value;
			}
		}
		data.push(entry);
	}

	return data;
}

module.exports = {
	getCopyright,
	getData
}