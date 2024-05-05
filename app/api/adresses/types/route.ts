// @ts-ignore
import clientPromise from "@/mongodb";

export async function GET(request: Request) {
	try {
		// @ts-ignore
		const client = await clientPromise;
		const db = client.db("gestions-adresses");
		const adressesType = await db
			.collection("adressesType")
			.find({})
			.sort({nom: 1})
			.limit(6)
			.toArray();
		return Response.json({
			types: JSON.parse(JSON.stringify(adressesType))
		});
	} catch (e) {
		console.error(e);
		return Response.json({types: []});
	}
}