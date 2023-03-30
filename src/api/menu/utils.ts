import { DailyMenu, DinnerItem, FetchedDinner, FetchedDinnerItem, FetchedExtraType, FetchedMealType } from "./types";

const reduceProps = (obj: FetchedDinnerItem): DinnerItem => {
  return {
    id: obj.id,
    name: obj.name,
    price: obj.price,
    uri: obj.image,
  };
};

export const parseFetchedDinners = (dinners: FetchedDinner[]): DailyMenu => {
  const weekDay: number = dinners[0][0].weekDay;

  const main: DinnerItem[] = [];
  let soup: DinnerItem | null = null;
  dinners.forEach((dinner) => {
    const fetchedMeal = dinner[0];
    const meal = reduceProps(fetchedMeal);

    switch (fetchedMeal.type) {
      case FetchedMealType.Main:
        main.push(meal);
        break;

      case FetchedMealType.Soup:
        soup = meal;
        break;
    }
  });

  const fillers: DinnerItem[] = [];
  const salads: DinnerItem[] = [];
  const beverages: DinnerItem[] = [];
  dinners[0][1].forEach((fetchedExtra) => {
    const extra = reduceProps(fetchedExtra);

    switch (fetchedExtra.type) {
      case FetchedExtraType.Filler:
        fillers.push(extra);
        break;

      case FetchedExtraType.Salad:
        salads.push(extra);
        break;

      case FetchedExtraType.Beverage:
        beverages.push(extra);
        break;
    }
  });

  return {
    main,
    soup: soup!,
    extras: {
      fillers,
      salads,
      beverages,
    },
    weekDay,
  };
};
