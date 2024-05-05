'use client';
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

export default function AdresseDetails() {
  const searchParams = useSearchParams()

  const idAdresse = searchParams.get('id')

  useEffect(() => {
    fetch('/api/adresses?id=' + idAdresse)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data)
      })
  }, []);


  const [adresses, setData] = useState(null);
  const [adresseDeleted, setDeletionStatus] = useState(false);

  function checkType(type: string) {
    return adresses?.adresses[0].type === type
  }

  const deleteAdresse = async (e) => {
    const response = await fetch('/api/adresses?id=' + idAdresse, {
      method: 'DELETE'
    }).then((res) => res.json())
      .then((data) => {
        setDeletionStatus(true)
      })
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="relative bg-gray-50 px-6 pb-20 w-full">
        <div className="relative mx-auto max-w-7xl">
          {adresseDeleted &&
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
              <p className="font-bold">Suppression de l'adresse</p>
              <p className="text-sm">L'adresse a été supprimée avec succès</p>
            </div>}
          {!adresseDeleted && <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-10">Adresse</h2>
            <table
              className="mb-10 text-left table-fixed w-full border-separate border-spacing-2 border border-slate-400">
              <thead>
              <tr>
                <th>Type</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Code postal</th>
                <th>Ville</th>
                <th>Pays</th>
              </tr>
              </thead>
              <tbody>
              {adresses?.adresses?.map((adresse) => (
                <tr key={adresse._id}>
                  <td>{adresse.type}</td>
                  <td>{adresse.nom}</td>
                  <td>{adresse.adresse}</td>
                  <td>{adresse.codepostal}</td>
                  <td>{adresse.ville}</td>
                  <td>{adresse.pays}</td>
                </tr>))
              }
              </tbody>
            </table>

            {checkType('Bar') &&
              <table className="text-left table-fixed w-full border-separate border-spacing-2 border border-slate-400">
                <thead className="text-left">
                <tr>
                  <th>Type de bar</th>
                  <th>Prix moyen</th>
                </tr>
                </thead>
                <tbody>
                {adresses?.adresses?.map((adresse) => (
                  <tr key={adresse._id}>
                    <td>{adresse.typeBar}</td>
                    <td>{adresse.prixMoyen}</td>
                  </tr>))
                }
                </tbody>
              </table>}

            {checkType('Musée') &&
              <table className="text-left table-fixed w-full border-separate border-spacing-2 border border-slate-400">
                <thead className="text-left">
                <tr>
                  <th>Courant artistique</th>
                  <th>Type d'art</th>
                  <th>Gratuit/Payant</th>
                  <th>Prix</th>
                </tr>
                </thead>
                <tbody>
                {adresses?.adresses?.map((adresse) => (
                  <tr key={adresse._id}>
                    <td>{adresse.courantArtistique}</td>
                    <td>{adresse.typeArt}</td>
                    <td>{adresse.gratuitPayant}</td>
                    <td>{adresse.prix}</td>
                  </tr>))
                }
                </tbody>
              </table>}

            {checkType('Parc') &&
              <table className="text-left table-fixed w-full border-separate border-spacing-2 border border-slate-400">
                <thead className="text-left">
                <tr>
                  <th>Type de parc</th>
                  <th>Public/Privé</th>
                  <th>Gratuit/Payant</th>
                  <th>Prix</th>
                </tr>
                </thead>
                <tbody>
                {adresses?.adresses?.map((adresse) => (
                  <tr key={adresse._id}>
                    <td>{adresse.typeParc}</td>
                    <td>{adresse.publicPrive}</td>
                    <td>{adresse.gratuitPayant}</td>
                    <td>{adresse.prix}</td>
                  </tr>))
                }
                </tbody>
              </table>}

            {checkType('Restaurant') &&
              <table className="text-left table-fixed w-full border-separate border-spacing-2 border border-slate-400">
                <thead className="text-left">
                <tr>
                  <th>Type de cuisine</th>
                  <th>Nombre d'étoiles</th>
                  <th>Prix moyen</th>
                </tr>
                </thead>
                <tbody>
                {adresses?.adresses?.map((adresse) => (
                  <tr key={adresse._id}>
                    <td>{adresse.typeCuisine}</td>
                    <td>{adresse.nbEtoile}</td>
                    <td>{adresse.prixMoyen}</td>
                  </tr>))
                }
                </tbody>
              </table>}
            <button onClick={deleteAdresse}
                    className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Supprimer
            </button>
          </div>}
        </div>
      </div>
    </main>
  );
};
