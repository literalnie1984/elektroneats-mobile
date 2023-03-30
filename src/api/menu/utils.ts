import { DailyMenu, DinnerItem, FetchedDinner, FetchedDinnerItem, FetchedExtraType, FetchedMealType } from "./types";

const reduceProps = (obj: FetchedDinnerItem): DinnerItem => {
  return {
    id: obj.id,
    name: obj.name,
    price: obj.price,
    uri: obj.image,
  };
};

export const parseFetchedDinners = (data: FetchedDinner[]): DailyMenu => {
  const weekDay: number = data[0].dinner.weekDay;

  const main: DinnerItem[] = [];
  let soup: DinnerItem | null = null;
  data.forEach((item) => {
    const fetchedMeal = item.dinner;
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
  data[0].extras.forEach((fetchedExtra) => {
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
