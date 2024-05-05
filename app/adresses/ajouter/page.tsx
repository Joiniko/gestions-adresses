 'use client';

import {useEffect, useState} from "react";
import {AdressesTypeProps} from "@/app/AdresseObject";

export default function AjouterAdresse() {
	const [adresseTypes, setAdressesTypes] = useState<AdressesTypeProps | null>();
	const [selectedType, setSelectedType] = useState<string | null>();
	const [selectedMuseePrix, setSelectedMuseePrix] = useState<string | null>();
	const [selectedParcPrix, setSelectedParcPrix] = useState<string | null>();
	const [adresseSaved, setAdresseSaved] = useState(false);
	const [formDataRestaurant, setFormDataRestaurant] = useState({
		typeCuisine : '',
		nbEtoile: '',
		prixMoyen: ''
	});
	const [formDataMusee, setFormDataMusee] = useState({
		courantArtistique : '',
		typeArt: '',
		gratuitPayant: '',
		prix: ''
	});
	const [formDataBar, setFormDataBar] = useState({
		typeBar : '',
		prixMoyen: ''
	});
	const [formDataParc, setFormDataParc] = useState({
		typeParc : '',
		publicPrive: '',
		gratuitPayant: '',
		prix: ''
	});
	const [communformData, setCommunformData] = useState({
		type : '',
		nom: '',
		adresse: '',
		codepostal: '',
		ville: '',
		pays: ''
	});
	useEffect(() => {
		fetch('/api/adresses/types')
			.then((res) => res.json())
			.then((data) => {
				setAdressesTypes(data)
			})
	}, []);
	const handleChangeType = (event: any) => {
		setSelectedType(event.target.value);
		setCommunformData((prevState) => ({
			...prevState,
			type: event.target.value
		}));
	};
	const handleChangeMuseePrix = (event: any) => {
		setSelectedMuseePrix(event.target.value);
		setFormDataMusee((prevState) => ({
			...prevState,
			gratuitPayant: event.target.value
		}))
	};
	const handleChangeParcPrix = (event: any) => {
		setSelectedParcPrix(event.target.value);
		setFormDataParc((prevState) => ({
			...prevState,
			gratuitPayant: event.target.value
		}))
	};
	const resetSelectedType = (event: any) => {
		setSelectedType('');
	};
	async function addAdresse(event) {
		event.preventDefault();
		let data = {...communformData}

		switch (selectedType) {
			case 'Restaurant':
				data = {...data, ...formDataRestaurant}
				break
			case 'Parc':
				data = {...data, ...formDataParc}
				break
			case 'Musée':
				data = {...data, ...formDataMusee}
				break
			case 'Bar':
				data = {...data, ...formDataBar}
				break
			default: console.log('Submit, No type selected yet')
		}
		const response = await fetch('/api/adresses', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" }
		})
		setAdresseSaved(true)
	}
	const updateSpecifiqueFormData = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		switch (selectedType) {
			case 'Restaurant':
				setFormDataRestaurant((prevState) => ({
					...prevState,
					[fieldName]: fieldValue
				}));
				break
			case 'Parc':
				setFormDataParc((prevState) => ({
					...prevState,
					[fieldName]: fieldValue
				}));
				break
			case 'Musée':
				setFormDataMusee((prevState) => ({
					...prevState,
					[fieldName]: fieldValue
				}));
				break
			case 'Bar':
				setFormDataBar((prevState) => ({
					...prevState,
					[fieldName]: fieldValue
				}));
				break
			default: console.log('No type selected yet')
		}
	};
	const updateCommunFormData = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		setCommunformData((prevState) => ({
			...prevState,
			[fieldName]: fieldValue
		}));
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-10">
			<div className="relative bg-gray-50 pt-5 pb-20 lg:px-8 lg:pt-24 lg:pb-28 w-1/2">
				<div className="relative mx-auto max-w-7xl">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-10">Ajouter une adresse</h2>
					</div>
					{!adresseSaved && <form className="mx-auto" onReset={resetSelectedType} onSubmit={addAdresse}>
						<div className="mb-5">
							<label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type de lieu</label>
							<select name="type"
											onChange={handleChangeType} required
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								<option value=''></option>
								{adresseTypes?.types.map((type) => (
									<option key={type._id}>{type.nom}</option>
								))}
							</select>
						</div>
						<div className="grid md:grid-cols-1 md:gap-6">
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="nom" id="nom" onChange={updateCommunFormData}
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="nom"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom
									de lieu</label>
							</div>
						</div>
						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="adresse" id="adresse" onChange={updateCommunFormData}
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="adresse"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adresse</label>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="codepostal" id="codepostal" onChange={updateCommunFormData}
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="codepostal"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code
									postal</label>
							</div>
						</div>
						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="ville" id="ville" onChange={updateCommunFormData}
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="ville"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ville</label>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<input type="text" name="pays" id="pays" onChange={updateCommunFormData}
											 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											 placeholder=" " required/>
								<label htmlFor="pays"
											 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pays</label>
							</div>
						</div>
						{selectedType == 'Restaurant' && <div className="grid md:grid-cols-3 md:gap-6">
							<div className="relative z-0 w-full mb-5 group">
								<label htmlFor="typeCuisine" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type de cuisine</label>
                  <select name="typeCuisine" id="typeCuisine" onChange={updateSpecifiqueFormData}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required>
                      <option></option>
                      <option value={'Traditionnelle'}>Traditionnelle</option>
                      <option value={'Gastronomique'}>Gastronomique</option>
                      <option value={'Exotique'}>Exotique</option>
                      <option value={'Moléculaire'}>Moléculaire</option>
                  </select>
              </div>
                <div className="relative z-0 w-full mb-5 group">
								<label htmlFor="nbEtoile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre
									d'étoiles</label>
								<select name="nbEtoile" id="nbEtoile" onChange={updateSpecifiqueFormData}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required>
									<option></option>
									<option value={1}>1</option>
									<option value={2}>2</option>
									<option value={3}>3</option>
								</select>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<label htmlFor="prixMoyen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix
									moyen</label>
								<select name="prixMoyen" id="prixMoyen" onChange={updateSpecifiqueFormData}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required>
									<option></option>
									<option value={1}>1</option>
									<option value={2}>2</option>
									<option value={3}>3</option>
									<option value={4}>4</option>
									<option value={5}>5</option>
								</select>
							</div>
						</div> }
						{selectedType == 'Musée' && <div className="grid md:grid-cols-4 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="courantArtistique"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Courant
                        artistique</label>
                    <select name="courantArtistique" id="courantArtistique" onChange={updateSpecifiqueFormData}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <option></option>
                        <option value={'Art abstrait'}>Art abstrait</option>
                        <option value={'Impressionnisme'}>Impressionnisme</option>
                        <option value={'Expressionnisme'}>Expressionnisme</option>
                        <option value={'Symbolisme'}>Symbolisme</option>
                        <option value={'Romantisme'}>Romantisme</option>
                    </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="typeArt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type
                        d'art</label>
                    <select name="typeArt" id="typeArt" onChange={updateSpecifiqueFormData}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <option></option>
                        <option value={'Peinture'}>Peinture</option>
                        <option value={'Sculpture'}>Sculpture</option>
                        <option value={'Beaux-arts'}>Beaux-arts</option>
                        <option value={'Contemporain'}>Contemporain</option>
                        <option value={'Moderne'}>Moderne</option>
                    </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="gratuitPayant"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gratuit/Payant</label>
                    <select name="gratuitPayant" id="gratuitPayant"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleChangeMuseePrix}
                            required>
                        <option></option>
                        <option value={'Gratuit'}>Gratuit</option>
                        <option value={'Payant'}>Payant</option>
                    </select>
                </div>
							{selectedMuseePrix == 'Payant' && <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="prix"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
                  <select name="prix" id="prix"  onChange={updateSpecifiqueFormData}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required>
                      <option></option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                  </select>
              </div>}
            </div>}
						{selectedType == 'Bar' && <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="typeBar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type de bar</label>
                    <select name="typeBar" id="typeBar" onChange={updateSpecifiqueFormData}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <option></option>
                        <option value={'Bar à vin'}>Bar à vin</option>
                        <option value={'Bar à cocktail'}>Bar à cocktail</option>
                        <option value={'Pub'}>Pub</option>
                    </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="prixMoyen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix
                        moyen</label>
                    <select name="prixMoyen" id="prixMoyen" onChange={updateSpecifiqueFormData}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <option></option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
            </div> }
						{selectedType == 'Parc' && <div className="grid md:grid-cols-4 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="typeParc"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type de parc</label>
                    <select name="typeParc" id="typeParc" onChange={updateSpecifiqueFormData}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <option></option>
                        <option value={'Parc floral'}>Parc floral</option>
                        <option value={'Parc forestier'}>Parc forestier</option>
                    </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="publicPrive"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Public/Privé</label>
                    <select name="publicPrive" id="publicPrive" onChange={updateSpecifiqueFormData}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <option></option>
                        <option value={'Public'}>Public</option>
                        <option value={'Privé'}>Privé</option>
                    </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="gratuitPayant"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gratuit/Payant</label>
                    <select name="gratuitPayant" id="gratuitPayant"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleChangeParcPrix}
                            required>
                        <option></option>
                        <option value={'Gratuit'}>Gratuit</option>
                        <option value={'Payant'}>Payant</option>
                    </select>
                </div>
								{selectedParcPrix == 'Payant' && <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="prix"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
                  <select name="prix" id="prix" onChange={updateSpecifiqueFormData}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required>
                      <option></option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                  </select>
              </div>}
            </div>}
						<button type="submit"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sauvegarder
						</button>
						<button type="reset"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5">Annuler
						</button>
					</form>}
					{adresseSaved &&
              <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                  <p className="font-bold">Ajouter adresse</p>
                  <p className="text-sm">L'adresse a été ajoutée avec succès</p>
              </div>}
				</div>
			</div>
		</main>
	);
};