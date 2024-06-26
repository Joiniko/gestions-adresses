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

interface AdressesProps {
	adresses: Adresse[];
}

export default async function ChercherAdresse() {
	const adresses = await getData()
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-10">
			<div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
				<div className="absolute inset-0">
					<div className="h-1/3 bg-white sm:h-2/3"></div>
				</div>
				<div className="relative mx-auto max-w-7xl">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Liste des adresses.</h2>
						<p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
							Voici une liste des adresses récemment ajoutées...</p>
					</div>
					<div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
						{adresses.adresses.map((adresse) => (
							<div className="flex flex-col overflow-hidden rounded-lg shadow-lg" key={adresse._id}>
								<div className="flex-shrink-0">
									<img className="h-48 w-full object-cover"
											 src="/photo-1496128858413-b36217c2ce36.jpg"
											 alt=""/>
								</div>
								<div className="flex flex-1 flex-col justify-between bg-white p-6">
									<div className="flex-1">
										<a href="#" className="mt-2 block">
											<p className="text-xl font-semibold text-gray-900">{adresse.nom}</p>
											<p className="mt-3 text-base text-gray-500">{adresse.description}</p>
										</a>
									</div>
									<div className="mt-6 flex items-center">
										<div className="flex-shrink-0">
											<span className="sr-only">{adresse.utilisateur}</span>
											<img className="h-10 w-10 rounded-full"
													 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
													 alt=""/>
										</div>
										<div className="ml-3">
											<p className="text-sm font-medium text-gray-900">
												{adresse.utilisateur}
											</p>
											<div className="flex space-x-1 text-sm text-gray-500">
												<time dateTime="2020-03-16">{adresse.date}</time>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
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