'use client';

import {AdressesTypeProps} from "@/app/AdresseObject";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function HomeAdresses() {
  const [searchParams , setParameter] = useState(new URLSearchParams());
  const [adresseTypes, setAdressesTypes] = useState<AdressesTypeProps | null>();

  useEffect(() => {
    fetch('/api/adresses?' + searchParams.toString())
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })

    fetch('/api/adresses/types')
      .then((res) => res.json())
      .then((data) => {
        setAdressesTypes(data)
      })
  }, []);

  const addFiltre = (e: any) => {
    if(e.target.value !== "")
      searchParams.set(e.target.name, e.target.value);
  };

  const doFiltre = async (e: any) => {
    e.preventDefault();
    fetch('/api/adresses?' + searchParams.toString())
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
    setParameter(new URLSearchParams());
    e.target.reset()
  };


  const [adresses, setData] = useState(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="relative bg-gray-50 px-6 pb-20 w-full">
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-row">
            <div className="mr-20 w-1/4">
              <div className="text-center">
                <h2 className="font-bold tracking-tight text-gray-900 sm:text-xl pb-3">Filtre</h2>
              </div>
              <form className="mx-auto border-2 p-4" onSubmit={doFiltre}>
                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="nom" id="nom" onChange={addFiltre}
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" "/>
                    <label htmlFor="nom"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom
                      de lieu</label>
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type de
                    lieu</label>
                  <select name="type" onChange={addFiltre}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value=''></option>
                    {adresseTypes?.types.map((type) => (
                      <option key={type._id}>{type.nom}</option>
                    ))}
                  </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="adresse" id="adresse" onChange={addFiltre}
                         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" "/>
                  <label htmlFor="adresse"
                         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adresse</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="codepostal" id="codepostal" onChange={addFiltre}
                         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" "/>
                  <label htmlFor="codepostal"
                         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code
                    postal</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="ville" id="ville" onChange={addFiltre}
                         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" "/>
                  <label htmlFor="ville"
                         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ville</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="pays" id="pays" onChange={addFiltre}
                         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                         placeholder=" "/>
                  <label htmlFor="pays"
                         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pays</label>
                </div>
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Chercher
                </button>
              </form>
            </div>
            <div className="w-3/4">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-6">Liste des adresses</h2>
              </div>
              <table className="table-fixed w-full border-separate border-spacing-2 border border-slate-400">
                <thead className="text-left">
                <tr>
                  <th>Type</th>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {adresses?.adresses?.map((adresse) => (
                  <tr key={adresse._id}>
                    <td>{adresse.type}</td>
                    <td>{adresse.nom}</td>
                    <td>{adresse.adresse}, {adresse.codepostal} {adresse.ville}</td>
                    <td className="text-right underline"><Link href={'/adresses/details?id=' + adresse._id}>details</Link></td>
                  </tr>))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
