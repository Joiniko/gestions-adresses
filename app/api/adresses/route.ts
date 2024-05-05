// @ts-ignore
import clientPromise from "@/mongodb";
import {ObjectId} from "mongodb";

export async function GET(request: Request) {
	try {
		// @ts-ignore
		const client = await clientPromise;
		const url = new URL(request.url);
		const searchParams = new URLSearchParams(url.search);
		var filtre = {}
		if(searchParams.has("id"))
		{
			var o_id = new ObjectId(searchParams.get('id'));
			filtre = {_id: o_id }
		} else searchParams.forEach((value, key) => filtre[key] = value)
		const db = client.db("gestions-adresses");
		const adressesType = await db
			.collection("adresses")
			.find(filtre)
			.sort({nom: 1})
			.toArray();
		return Response.json({
			adresses: JSON.parse(JSON.stringify(adressesType))
		});
	} catch (e) {
		console.error(e);
		return Response.json({adresses: []});
	}
}

export async function POST(request: Request) {
	try {
		// @ts-ignore
		const client = await clientPromise;
		const body = await request.text()
		const db = client.db("gestions-adresses");
		await db
			.collection("adresses")
			.insertOne(JSON.parse(body))
		return Response.json(
			JSON.parse(JSON.stringify('Added'))
		);
	} catch (e) {
		console.error(e);
		return Response.json([]);
	}
}

export async function DELETE(request: Request) {
	try {
		// @ts-ignore
		const client = await clientPromise;
		const url = new URL(request.url);
		const searchParams = new URLSearchParams(url.search);
		var filtre = {}
		if(searchParams.has("id"))
		{
			var o_id = new ObjectId(searchParams.get('id'));
			filtre = {_id: o_id }
			console.log(filtre);
			const db = client.db("gestions-adresses");
			await db.collection("adresses").deleteOne(filtre)
			return Response.json(JSON.parse(JSON.stringify('Deleted')));
		} else return Response.json({adresses: []});
	} catch (e) {
		console.error(e);
		return Response.json({adresses: []});
	}
}