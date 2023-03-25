import { View, Text, Pressable } from "react-native";
import { style } from "../../styles";
import { FlashList } from "@shopify/flash-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { SyntheticEvent, useState } from "react";
import SegmentedControl  from '@react-native-segmented-control/segmented-control';
import SegmentedSwitch from "../../components/SegmentedSwitch";

const MenuVariant = (props) => {
		return (
				<View style={style.menuVariant}>
						<View style={style.menuVariantRow}>
								<Text>Soup:</Text>
								<Text>{props.menu.soup}</Text>
						</View>
						<View style={style.menuVariantRow}>
								<Text>Main course:</Text>
								<Text>{props.menu.mainCourse}</Text>
						</View>
						<View style={style.menuVariantRow}>
								<Text>Side dish:</Text>
								<Text>{props.menu.sideDish}</Text>
						</View>
						<View style={style.menuVariantRow}>
								<Text>Beverage:</Text>
								<Text>{props.menu.beverage}</Text>
						</View>
				</View>
		);
};

const MenuItem = (props) => {

		const [ isFolded, setIsFolded ] = useState(true);
		const [ selectedIndex, setSelectedIndex ] = useState(0);

		return(
				<View>
						<View style={style.menuItemBar}>
								<Text>{props.dateSignature}</Text>
								<Pressable onPress={() => setIsFolded(!isFolded)}>
								<FontAwesomeIcon
										icon={isFolded ? faChevronDown : faChevronUp}
										size={32}
								/>
								</Pressable>
						</View>
						{
						!isFolded ? (
								<View style={style.menuItemContainer}>
										<SegmentedSwitch
												segments={['Variant I', 'Variant II', 'Variant III']}
												onSegmentSwitch={(selectedSegment) => setSelectedIndex(selectedSegment)}
										/>
										<MenuVariant menu={props.menuVariants[selectedIndex]} />
								</View>
						)
						: (<View style={{display: "none"}} />)
						}
				</View>
		);
};

const MenuView = () => {
		const menu = [
				{
						dateSignature: "21.03 (Czwartek)",
						menuVariants: [
								{
										soup:"Zupa pomidorowa z ryżem",
										mainCourse:"Bitki wieprzowe w sosie tzatziki",
										sideDish:"Ziemniaki",
										beverage:"Kompot",
								},
								{
										soup:"Rosół wołowy z makaronem",
										mainCourse:"Kotlet pożarski wieprzowy",
										sideDish:"Ziemniaki", 
										beverage:"Kompot",
								},
								{
										soup:"Barszcz czerwony z uszkami",
										mainCourse:"Ryba po grecku",
										sideDish:"Ryż",
										beverage:"Kompot",
								},
						],
				},
				{
						dateSignature: "22.03 (Piątek)",
						menuVariants: [
								{
										soup:"Zupa pomidorowa z ryżem",
										mainCourse:"Bitki wieprzowe w sosie tzatziki",
										sideDish:"Ziemniaki",
										beverage:"Kompot",
								},
								{
										soup:"Rosół wołowy z makaronem",
										mainCourse:"Kotlet pożarski wieprzowy",
										sideDish:"Ziemniaki", 
										beverage:"Kompot",
								},
								{
										soup:"Barszcz czerwony z uszkami",
										mainCourse:"Ryba po grecku",
										sideDish:"Ryż",
										beverage:"Kompot",
								},
						],
				},
				{
						dateSignature: "23.03 (Sobota)",
						menuVariants: [
								{
										soup:"Zupa pomidorowa z ryżem",
										mainCourse:"Bitki wieprzowe w sosie tzatziki",
										sideDish:"Ziemniaki",
										beverage:"Kompot",
								},
								{
										soup:"Rosół wołowy z makaronem",
										mainCourse:"Kotlet pożarski wieprzowy",
										sideDish:"Ziemniaki", 
										beverage:"Kompot",
								},
								{
										soup:"Barszcz czerwony z uszkami",
										mainCourse:"Ryba po grecku",
										sideDish:"Ryż",
										beverage:"Kompot",
								},
						],
				},
		];

  return (
    <View style={style.container}>
		{menu.map((menu_item, index) => (<MenuItem dateSignature={menu_item.dateSignature} menuVariants={menu_item.menuVariants} key={index} />))}
    </View>
  );
};

export default MenuView;
