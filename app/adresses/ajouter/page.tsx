// @ts-ignore
import clientPromise from "../../../mongodb";

interface Adresse {
	_id: string;
	nom: string;
	description: string;
	image: string;
	utilisateur: string;
	adresse: string;
	ville: string;
	codepostale: string;
	date: string;
}

interface AdresseType {
	_id: string;
	nom: string;
}

interface AdressesTypeProps {
	types: AdresseType[];
}
interface AdressesProps {
	adresses: Adresse[];
}

export default async function AjouterAdresse() {
	const adresseTypes = await getAdresseType()
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-10">
			<div className="relative bg-gray-50 pt-5 pb-20 lg:px-8 lg:pt-24 lg:pb-28 w-1/2">
				<div className="relative mx-auto max-w-7xl">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-10">Ajouter une adresse</h2>
					</div>

					<form className="mx-auto">
						<div className="mb-5">
							<label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
							<select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								{adresseTypes.types.map((type) => (
									<option key={type._id}>{type.nom}</option>
								))}
							</select>
						</div>
						<div className="grid md:grid-cols-1 md:gap-6">
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="nom" id="nom"
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="nom"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom</label>
							</div>
						</div>
						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="adresse" id="adresse"
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="adresse"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adresse</label>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="codepostale" id="codepostale"
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="codepostale"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code
									postale</label>
							</div>
						</div>
						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="ville" id="ville"
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="ville"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ville</label>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="pays" id="pays"
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="pays"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pays</label>
							</div>
						</div>
						<div className="grid md:grid-cols-1 md:gap-6">
							<div className="relative z-0 w-full mb-5 group">
								<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description du lieu</label>
								<textarea id="message" rows={4}
													className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
													placeholder=" " required/>
							</div>
						</div>
						<div className="mb-5">
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Charger une image</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								id="file_input" type="file"/>
						</div>
						<button type="submit"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sauvegarder
						</button>
						<button type="reset"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5">Annuler
						</button>
					</form>
				</div>
			</div>
		</main>
	);
};

async function getData(): Promise<AdressesProps> {
	try {
		// @ts-ignore
		const client = await clientPromise;
		const db = client.db("gestions-adresses");
		const adresses = await db
			.collection("adresses")
			.find({})
			.sort({date: -1})
			.limit(6)
			.toArray();
		return {
			adresses: JSON.parse(JSON.stringify(adresses))
		};
	} catch (e) {
		console.error(e);
		return {adresses: []};
	}
}

async function getAdresseType(): Promise<AdressesTypeProps> {
	try {
		// @ts-ignore
		const client = await clientPromise;
		const db = client.db("gestions-adresses");
		const types = await db
			.collection("adressesType")
			.find({})
			.sort({nom: 1})
			.toArray();
		return {
			types: JSON.parse(JSON.stringify(types))
		};
	} catch (e) {
		console.error(e);
		return {types: []};
	}
}