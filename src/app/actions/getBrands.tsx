"use server";

export async function getBrands() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`,
      {
        cache: "no-store", // avoid stale data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { data: [] }; // fallback
  }
}
