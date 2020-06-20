export async function sleep() {
  return await new Promise((resolve) => setTimeout(resolve, 500));
}
