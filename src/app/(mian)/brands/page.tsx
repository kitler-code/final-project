import Image from "next/image";
import { getBrands } from "@/app/actions/getBrands";

export default async function BrandsPage() {
  const data = await getBrands();
  const brands = data.data;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand: any) => (
          <div
            key={brand._id}
            className="flex flex-col items-center bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={120}
              height={120}
              className="object-contain"
            />
            <p className="mt-2 text-center font-medium">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
