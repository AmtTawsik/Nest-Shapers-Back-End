/* eslint-disable @typescript-eslint/no-explicit-any */
export const findFilterConditions = (
  searchTerm: string | undefined,
  filtersData: object,
  searchableFields: string[],
  relationalFields: string[],
  relationalFieldsMapper: { [key: string]: string }
) => {
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: searchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        if (relationalFields.includes(key)) {
          return {
            [relationalFieldsMapper[key]]: {
              id: (filtersData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }

  return andConditions;
};

export const findFilterConditionsWithPrice = (
  searchTerm: string | undefined,
  filtersData: Record<string, any>,
  searchableFields: string[],
  relationalFields: string[],
  relationalFieldsMapper: { [key: string]: string }
) => {
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: searchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        if (relationalFields.includes(key)) {
          return {
            [relationalFieldsMapper[key]]: {
              id: filtersData[key],
            },
          };
        } else if (key === 'minPrice') {
          return {
            price: {
              gte: Number(filtersData[key]),
            },
          };
        } else if (key === 'maxPrice') {
          return {
            price: {
              lte: Number(filtersData[key]),
            },
          };
        } else {
          return {
            [key]: {
              equals: filtersData[key],
            },
          };
        }
      }),
    });
  }

  return andConditions;
};

export const findFilterConditionsWithoutRelation = (
  searchTerm: string | undefined,
  filtersData: object,
  searchableFields: string[]
) => {
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: searchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  return andConditions;
};
