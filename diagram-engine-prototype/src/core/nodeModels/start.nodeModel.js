import { OUT_PORT_LABEL, AbstractNodeModel } from './abstract.nodeModel';

export default class StartNodeModel extends AbstractNodeModel {
	static NAME = 'Start';
	static COLOR = 'rgb(79, 219, 24)';

	static DEFAULT_NODE_SETTINGS = {};

	constructor(x, y) {
		super(StartNodeModel.NAME, StartNodeModel.COLOR, StartNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);
	}

	/**
	 * @param {NodeData} data 
	 * @returns {NodeData}
	 */
	run() {
		return TMP_FAKE_DATA;
	}
}

const TMP_FAKE_DATA = JSON.parse(`
{
	"keys": [
		"Redni broj",
		"Ime",
		"Prezime",
		"Prosjek",
		"Dan rođenja",
		"Mjesec rođenja",
		"Datum rođenja",
		"Spol",
		"Visina",
		"Težina"
	],
	"rows": [
		{
			"Redni broj": 1,
			"Ime": "Luka",
			"Prezime": "Blažević",
			"Prosjek": 5,
			"Dan rođenja": 21,
			"Mjesec rođenja": 4,
			"Datum rođenja": "21/04/2010",
			"Spol": "M",
			"Visina": 132,
			"Težina": 26.6
		},
		{
			"Redni broj": 2,
			"Ime": "Marko",
			"Prezime": "Božić",
			"Prosjek": 2.5,
			"Dan rođenja": 11,
			"Mjesec rođenja": 11,
			"Datum rođenja": "11/11/2010",
			"Spol": "M",
			"Visina": 125,
			"Težina": 29.5
		},
		{
			"Redni broj": 3,
			"Ime": "Jakov",
			"Prezime": "Kovačević",
			"Prosjek": 2.5,
			"Dan rođenja": 2,
			"Mjesec rođenja": 6,
			"Datum rođenja": "02/06/2010",
			"Spol": "M",
			"Visina": 137,
			"Težina": 34.3
		},
		{
			"Redni broj": 4,
			"Ime": "Ivan",
			"Prezime": "Marković",
			"Prosjek": 5,
			"Dan rođenja": 4,
			"Mjesec rođenja": 11,
			"Datum rođenja": "04/11/2010",
			"Spol": "M",
			"Visina": 125,
			"Težina": 27.2
		},
		{
			"Redni broj": 5,
			"Ime": "Petar",
			"Prezime": "Lovrić",
			"Prosjek": 4.1,
			"Dan rođenja": 26,
			"Mjesec rođenja": 3,
			"Datum rođenja": "26/03/2010",
			"Spol": "M",
			"Visina": 136,
			"Težina": 28.5
		},
		{
			"Redni broj": 6,
			"Ime": "Matej",
			"Prezime": "Babić",
			"Prosjek": 3.1,
			"Dan rođenja": 5,
			"Mjesec rođenja": 4,
			"Datum rođenja": "05/04/2010",
			"Spol": "M",
			"Visina": 133,
			"Težina": 26.9
		},
		{
			"Redni broj": 7,
			"Ime": "Gabrijel",
			"Prezime": "Grgić",
			"Prosjek": 3.2,
			"Dan rođenja": 17,
			"Mjesec rođenja": 2,
			"Datum rođenja": "17/02/2010",
			"Spol": "M",
			"Visina": 133,
			"Težina": 30.5
		},
		{
			"Redni broj": 8,
			"Ime": "Filip",
			"Prezime": "Brkić",
			"Prosjek": 3.9,
			"Dan rođenja": 6,
			"Mjesec rođenja": 3,
			"Datum rođenja": "06/03/2010",
			"Spol": "M",
			"Visina": 126,
			"Težina": 32.6
		},
		{
			"Redni broj": 9,
			"Ime": "Fran",
			"Prezime": "Horvat",
			"Prosjek": 3.9,
			"Dan rođenja": 1,
			"Mjesec rođenja": 3,
			"Datum rođenja": "01/03/2010",
			"Spol": "M",
			"Visina": 125,
			"Težina": 30.6
		},
		{
			"Redni broj": 10,
			"Ime": "David",
			"Prezime": "Filipović",
			"Prosjek": 2.7,
			"Dan rođenja": 15,
			"Mjesec rođenja": 10,
			"Datum rođenja": "15/10/2010",
			"Spol": "M",
			"Visina": 139,
			"Težina": 32.4
		},
		{
			"Redni broj": 11,
			"Ime": "Mia",
			"Prezime": "Vidović",
			"Prosjek": 4.8,
			"Dan rođenja": 14,
			"Mjesec rođenja": 6,
			"Datum rođenja": "14/06/2010",
			"Spol": "Ž",
			"Visina": 125,
			"Težina": 30.6
		},
		{
			"Redni broj": 12,
			"Ime": "Lucija",
			"Prezime": "Knežević",
			"Prosjek": 3.4,
			"Dan rođenja": 22,
			"Mjesec rođenja": 12,
			"Datum rođenja": "22/12/2010",
			"Spol": "Ž",
			"Visina": 135,
			"Težina": 32
		},
		{
			"Redni broj": 13,
			"Ime": "Ema",
			"Prezime": "Knežević",
			"Prosjek": 4.7,
			"Dan rođenja": 26,
			"Mjesec rođenja": 9,
			"Datum rođenja": "26/09/2010",
			"Spol": "Ž",
			"Visina": 128,
			"Težina": 27
		},
		{
			"Redni broj": 14,
			"Ime": "Ana",
			"Prezime": "Bošnjak",
			"Prosjek": 3.2,
			"Dan rođenja": 11,
			"Mjesec rođenja": 1,
			"Datum rođenja": "11/01/2010",
			"Spol": "Ž",
			"Visina": 135,
			"Težina": 27.6
		},
		{
			"Redni broj": 15,
			"Ime": "Petra",
			"Prezime": "Kovačić",
			"Prosjek": 4.9,
			"Dan rođenja": 25,
			"Mjesec rođenja": 8,
			"Datum rođenja": "25/08/2010",
			"Spol": "Ž",
			"Visina": 127,
			"Težina": 26.1
		},
		{
			"Redni broj": 16,
			"Ime": "Ena",
			"Prezime": "Horvat",
			"Prosjek": 4.4,
			"Dan rođenja": 22,
			"Mjesec rođenja": 3,
			"Datum rođenja": "22/03/2010",
			"Spol": "Ž",
			"Visina": 128,
			"Težina": 28.4
		},
		{
			"Redni broj": 17,
			"Ime": "Lana",
			"Prezime": "Tomić",
			"Prosjek": 3.9,
			"Dan rođenja": 29,
			"Mjesec rođenja": 4,
			"Datum rođenja": "29/04/2010",
			"Spol": "Ž",
			"Visina": 134,
			"Težina": 26.8
		},
		{
			"Redni broj": 18,
			"Ime": "Dora",
			"Prezime": "Jukić",
			"Prosjek": 2.1,
			"Dan rođenja": 15,
			"Mjesec rođenja": 12,
			"Datum rođenja": "15/12/2010",
			"Spol": "Ž",
			"Visina": 133,
			"Težina": 26.5
		},
		{
			"Redni broj": 19,
			"Ime": "Marta",
			"Prezime": "Pavlović",
			"Prosjek": 4,
			"Dan rođenja": 25,
			"Mjesec rođenja": 9,
			"Datum rođenja": "25/09/2010",
			"Spol": "Ž",
			"Visina": 125,
			"Težina": 28
		},
		{
			"Redni broj": 20,
			"Ime": "Sara",
			"Prezime": "Novak",
			"Prosjek": 4.9,
			"Dan rođenja": 18,
			"Mjesec rođenja": 12,
			"Datum rođenja": "18/12/2010",
			"Spol": "Ž",
			"Visina": 129,
			"Težina": 32.6
		},
		{
			"Redni broj": 21,
			"Ime": "Filip",
			"Prezime": "Šimunović",
			"Prosjek": 4.3,
			"Dan rođenja": 16,
			"Mjesec rođenja": 8,
			"Datum rođenja": "16/08/2010",
			"Spol": "M",
			"Visina": 140,
			"Težina": 33.9
		},
		{
			"Redni broj": 22,
			"Ime": "Sara",
			"Prezime": "Mandić",
			"Prosjek": 3.1,
			"Dan rođenja": 18,
			"Mjesec rođenja": 1,
			"Datum rođenja": "18/01/2010",
			"Spol": "Ž",
			"Visina": 127,
			"Težina": 25.7
		},
		{
			"Redni broj": 23,
			"Ime": "Ivan",
			"Prezime": "Horvat",
			"Prosjek": 3.6,
			"Dan rođenja": 30,
			"Mjesec rođenja": 12,
			"Datum rođenja": "30/12/2010",
			"Spol": "M",
			"Visina": 138,
			"Težina": 33.5
		},
		{
			"Redni broj": 24,
			"Ime": "Luka",
			"Prezime": "Jurković",
			"Prosjek": 4.8,
			"Dan rođenja": 30,
			"Mjesec rođenja": 5,
			"Datum rođenja": "30/05/2010",
			"Spol": "M",
			"Visina": 128,
			"Težina": 26.5
		},
		{
			"Redni broj": 25,
			"Ime": "Ana",
			"Prezime": "Lončar",
			"Prosjek": 4.6,
			"Dan rođenja": 19,
			"Mjesec rođenja": 12,
			"Datum rođenja": "19/12/2010",
			"Spol": "Ž",
			"Visina": 127,
			"Težina": 29.2
		},
		{
			"Redni broj": 26,
			"Ime": "Petra",
			"Prezime": "Šimić",
			"Prosjek": 2.3,
			"Dan rođenja": 27,
			"Mjesec rođenja": 2,
			"Datum rođenja": "27/02/2010",
			"Spol": "Ž",
			"Visina": 139,
			"Težina": 34.4
		},
		{
			"Redni broj": 27,
			"Ime": "Luka",
			"Prezime": "Kovačević",
			"Prosjek": 4.3,
			"Dan rođenja": 13,
			"Mjesec rođenja": 2,
			"Datum rođenja": "13/02/2010",
			"Spol": "M",
			"Visina": 128,
			"Težina": 28.4
		},
		{
			"Redni broj": 28,
			"Ime": "Marko",
			"Prezime": "Jurić",
			"Prosjek": 3.7,
			"Dan rođenja": 13,
			"Mjesec rođenja": 8,
			"Datum rođenja": "13/08/2010",
			"Spol": "M",
			"Visina": 134,
			"Težina": 32.9
		},
		{
			"Redni broj": 29,
			"Ime": "Ivan",
			"Prezime": "Rukavina",
			"Prosjek": 5,
			"Dan rođenja": 2,
			"Mjesec rođenja": 5,
			"Datum rođenja": "02/05/2010",
			"Spol": "M",
			"Visina": 140,
			"Težina": 32.9
		},
		{
			"Redni broj": 30,
			"Ime": "Marko",
			"Prezime": "Perković",
			"Prosjek": 3.3,
			"Dan rođenja": 11,
			"Mjesec rođenja": 9,
			"Datum rođenja": "11/09/2010",
			"Spol": "M",
			"Visina": 133,
			"Težina": 29.6
		},
		{
			"Redni broj": 31,
			"Ime": "Petar",
			"Prezime": "Lukić",
			"Prosjek": 4.3,
			"Dan rođenja": 28,
			"Mjesec rođenja": 10,
			"Datum rođenja": "28/10/2010",
			"Spol": "M",
			"Visina": 128,
			"Težina": 30.8
		},
		{
			"Redni broj": 32,
			"Ime": "Mia",
			"Prezime": "Matijević",
			"Prosjek": 4.4,
			"Dan rođenja": 26,
			"Mjesec rođenja": 9,
			"Datum rođenja": "26/09/2010",
			"Spol": "Ž",
			"Visina": 140,
			"Težina": 25.2
		},
		{
			"Redni broj": 33,
			"Ime": "Ivan",
			"Prezime": "Novosel",
			"Prosjek": 2.5,
			"Dan rođenja": 4,
			"Mjesec rođenja": 11,
			"Datum rođenja": "04/11/2010",
			"Spol": "M",
			"Visina": 137,
			"Težina": 28.9
		},
		{
			"Redni broj": 34,
			"Ime": "Lucija",
			"Prezime": "Klarić",
			"Prosjek": 5,
			"Dan rođenja": 23,
			"Mjesec rođenja": 11,
			"Datum rođenja": "23/11/2010",
			"Spol": "Ž",
			"Visina": 136,
			"Težina": 29.8
		},
		{
			"Redni broj": 35,
			"Ime": "Petra",
			"Prezime": "Horvat",
			"Prosjek": 3.6,
			"Dan rođenja": 10,
			"Mjesec rođenja": 3,
			"Datum rođenja": "10/03/2010",
			"Spol": "Ž",
			"Visina": 130,
			"Težina": 34.8
		},
		{
			"Redni broj": 36,
			"Ime": "Dora",
			"Prezime": "Kovač",
			"Prosjek": 3,
			"Dan rođenja": 3,
			"Mjesec rođenja": 5,
			"Datum rođenja": "03/05/2010",
			"Spol": "Ž",
			"Visina": 135,
			"Težina": 31.5
		},
		{
			"Redni broj": 37,
			"Ime": "Ana",
			"Prezime": "Kralj",
			"Prosjek": 2.1,
			"Dan rođenja": 10,
			"Mjesec rođenja": 9,
			"Datum rođenja": "10/09/2010",
			"Spol": "Ž",
			"Visina": 125,
			"Težina": 27.1
		},
		{
			"Redni broj": 38,
			"Ime": "Petar",
			"Prezime": "Vuković",
			"Prosjek": 3.4,
			"Dan rođenja": 24,
			"Mjesec rođenja": 9,
			"Datum rođenja": "24/09/2010",
			"Spol": "M",
			"Visina": 130,
			"Težina": 34.2
		},
		{
			"Redni broj": 39,
			"Ime": "Ana",
			"Prezime": "Varga",
			"Prosjek": 4.9,
			"Dan rođenja": 22,
			"Mjesec rođenja": 1,
			"Datum rođenja": "22/01/2010",
			"Spol": "Ž",
			"Visina": 135,
			"Težina": 25.8
		}
	]
}
`)