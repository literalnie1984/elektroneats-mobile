import { DailyMenu, DinnerItem, FetchedDinnerItem, FetchedExtra, FetchedExtraType, FetchedMealType, FetchedWeeklyMenu, WeeklyMenu } from "./types";

const reduceProps = (obj: FetchedDinnerItem): DinnerItem => {
  return {
    id: obj.id,
    name: obj.name,
    price: obj.price,
    uri: obj.image,
  };
};

export const parseFetchedWeeklyMenu = ({ response, extras }: FetchedWeeklyMenu): WeeklyMenu => {
  const dailyMenus: DailyMenu[] = [];

  response.forEach(singleMenu => {
    if(singleMenu.dinners.length === 0) return;
    const weekDay: number = singleMenu.dinners[0].weekDay;

    const mappedExtras = singleMenu.extrasIds.map(id => extras.find(i => i.id === id));
    const safeExtras = mappedExtras.filter(i => i !== undefined) as FetchedExtra[];

    const fillers: DinnerItem[] = safeExtras.filter(i => i.type === FetchedExtraType.Filler).map(reduceProps);
    const salads: DinnerItem[] = safeExtras.filter(i => i.type === FetchedExtraType.Salad).map(reduceProps);
    const beverages: DinnerItem[] = safeExtras.filter(i => i.type === FetchedExtraType.Beverage).map(reduceProps);

    dailyMenus.push({
      main: singleMenu.dinners.filter((i) => i.type === FetchedMealType.Main).map(reduceProps),
      soup: singleMenu.dinners.filter((i) => i.type === FetchedMealType.Soup).map(reduceProps)[0],
      extras: {
        fillers,
        salads,
        beverages
      },
      weekDay
    });
  });

  return dailyMenus;
};
