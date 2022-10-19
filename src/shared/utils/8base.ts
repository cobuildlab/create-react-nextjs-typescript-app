/**
 *
 * @param page - Current page.
 * @param perPage - Items showing per page.
 * @returns -.
 */
export const get8basePaginateParamsByPage = (
  page: number,
  perPage: number,
): { skip: number | null; first: number | null } => {
  const skip = (page - 1) * perPage;
  const first = perPage;

  return { skip, first };
};
