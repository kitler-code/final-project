// "use client";
// import Image from "next/image";
// import { getBrands } from "@/app/actions/getBrands";
// import { Brand } from "@/types/brand.type";
// import { useEffect, useState } from "react";
// export default function BrandsPage() {
//   const [brands, setBrands] = useState<any[]>([]);

//   useEffect(() => {
//     getBrands().then((res) => setBrands(res.data));
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Brands</h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {brands.map((brand: Brand) => (
//           <div
//             key={brand._id}
//             className="flex flex-col items-center bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
//           >
//             <Image
//               src={brand.image}
//               alt={brand.name}
//               width={120}
//               height={120}
//               className="object-contain"
//             />
//             <p className="mt-2 text-center font-medium">{brand.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";
// import Image from "next/image";
// import { Brand } from "@/types/brand.type";
// import { useEffect, useState } from "react";

// export default function BrandsPage() {
//   const [brands, setBrands] = useState<Brand[]>([]);

//   useEffect(() => {
//     async function fetchBrands() {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`
//         );
//         if (!res.ok) throw new Error("Failed to fetch brands");
//         const data = await res.json();
//         setBrands(data.data || []); // keep fallback if data is missing
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//       }
//     }

//     fetchBrands();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Brands</h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {brands.map((brand: Brand) => (
//           <div
//             key={brand._id}
//             className="flex flex-col items-center bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
//           >
//             <Image
//               src={brand.image}
//               alt={brand.name}
//               width={120}
//               height={120}
//               className="object-contain"
//             />
//             <p className="mt-2 text-center font-medium">{brand.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
