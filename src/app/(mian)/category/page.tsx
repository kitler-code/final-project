import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}

// import { category } from "@/types/category.type";
// import Image from "next/image";
// import Link from "next/link";

// async function getCategories() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch categories");
//   }

//   return res.json();
// }

// export default async function CategoryPage() {
//   const data = await getCategories();
//   const Categories: category[] = data.data;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Categories</h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {Categories.map((cat: category) => (
//           <Link
//             href={`/category/${cat._id}`}
//             key={cat._id}
//             className="flex flex-col items-center bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
//           >
//             <Image
//               src={cat.image}
//               alt={cat.name}
//               width={120}
//               height={120}
//               className="object-contain"
//             />
//             <p className="mt-2 text-center font-medium">{cat.name}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
