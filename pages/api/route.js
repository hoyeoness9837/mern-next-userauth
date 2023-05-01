// import { NextResponse } from 'next/server';

// export async function GET(req, res) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');
//   const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   });
//   const product = await res.json();

//   return NextResponse.json({ product });
// }

// export async function POST() {
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//     body: JSON.stringify({ time: new Date().toISOString() }),
//   });

//   const data = await res.json();

//   return NextResponse.json(data);
// }
