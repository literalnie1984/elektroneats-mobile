import { Beverage, MenuContent } from '../../types/index';
import { atom, selector } from 'recoil';
import { MenuList } from '../../types/index';
import { getMenu, debugParseMenuJSON } from '../../api/menu';
import { Extras } from '../../types/index';

export const menuAtom = atom({ key: 'menu', default: [] as MenuList  });
export const menuSelector = selector({
		key: 'menuGet',
		get: async () => {
				const response = await getMenu();
				return response;
		} ,
});

export const countVariants = function(menuContent: MenuContent){
		let main_count = 0;
		let soup_count = 0;

		menuContent.main.map(() => main_count++);
		menuContent.soup.map(() => soup_count++);

		return main_count > soup_count ? main_count : soup_count;
}

export const generateVariantTags = function(variantCount: number){
		const variantTags = [];
		for(let i = 1; i <= variantCount; i++){
				variantTags.push(`Variant ${i}`);
		}

		return variantTags;
}

export const generateExtrasString = function(extras: Extras){
		let extras_string = "";
		for(let i = 0; i < extras.length; i++){
				if(i < extras.length - 1){
						if(!extras_string.includes(extras[i][0].name)) { extras_string += `${extras[i][0].name}, `; }
				} else { if(!extras_string.includes(extras[i][0].name)) extras_string += `${extras[i][0].name}`;} 
		};

		if(extras_string.charAt(extras_string.length - 2) === ","){
				extras_string = extras_string.split(",")[0];
		}

		return extras_string;
};

export const generateBeverageString = function(beverage: Beverage){
		let isBeverage = false;
		let beverageName;
		for(let i = 0; i < beverage.length; i++){
				if(beverage[i].length !== 0) {
						isBeverage = true;
						beverageName = beverage[i][0].name; 
						break;
				};
		};

		return beverageName || "brak";
};


