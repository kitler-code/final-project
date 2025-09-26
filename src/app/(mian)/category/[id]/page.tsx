import { category } from "@/types/category.type";

async function getSubCategories(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch subcategories");
  }

  return res.json();
}

export default async function SubCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getSubCategories(params.id);
  const subCategories: category[] = data.data;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sub Categories</h1>

      {subCategories.length === 0 ? (
        <p className="text-gray-500">No subcategories found.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {subCategories.map((sub: category) => (
            <li
              key={sub._id}
              className="p-4 bg-white shadow rounded-xl hover:shadow-lg transition"
            >
              <p className="text-center font-medium">{sub.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
