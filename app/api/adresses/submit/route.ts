// @ts-ignore
import clientPromise from "@/mongodb";

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
			JSON.parse(JSON.stringify('adresses'))
		);
	} catch (e) {
		console.error(e);
		return Response.json([]);
	}
}