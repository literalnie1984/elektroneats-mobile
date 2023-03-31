import { View, Text, SectionList, ScrollView, Image, TouchableOpacity } from "react-native";
import { dinnerViewStyles } from "../../styles";
import { useState } from "react";
import { DinnerData, DinnerItemProps, DinnerSelectProps, DinnerViewProps, InnerIndex, SelectedDinnerItem } from "../../types";

const placeholderUri = "https://i.imgur.com/ejtUaJJ.png";
const DinnerItemView = ({ item, backgroundColor, onPress }: DinnerItemProps) => {
  const { name, uri } = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[dinnerViewStyles.itemView, { backgroundColor }]}>
        <Image style={dinnerViewStyles.itemImg} source={{ uri: placeholderUri ?? uri }} />
        <Text style={dinnerViewStyles.itemTitle}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DinnerSelect = ({ selectedIndex, setSelectedIndex, items }: DinnerSelectProps) => {
  return (
    <ScrollView horizontal={true} nestedScrollEnabled={false}>
      {items.map((item, index) => {
        const backgroundColor = index === selectedIndex ? "#ffffff" : "#bfbdbd";

        return (
          <DinnerItemView
            key={item.id}
            onPress={() => {
              if (selectedIndex === index) setSelectedIndex(null);
              else setSelectedIndex(index);
            }}
            item={item}
            backgroundColor={backgroundColor}
          />
        );
      })}
    </ScrollView>
  );
};

const DinnerView = ({ route, navigation }: DinnerViewProps) => {
  const { dailyMenu } = route.params;
  const [selectedArr, setSelectedArr] = useState<SelectedDinnerItem[]>([]);

  const sections: DinnerData[] = [
    { section: "Main dish", data: [dailyMenu.main] },
    { section: "Extras", data: [dailyMenu.extras.fillers, dailyMenu.extras.salads, dailyMenu.extras.beverages] },
    { section: "Soup", data: [[dailyMenu.soup]] },
  ];

  return (
    <View style={dinnerViewStyles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(_, index) => index.toString()}
        renderItem={(data) => {
          const changeSelected = (innerIndex: InnerIndex) => {
            const selectedIndex = selectedArr.findIndex((obj) => obj.section === data.section.section && obj.index === data.index);
            if (selectedIndex === -1) {
              setSelectedArr([...selectedArr, { section: data.section.section, index: data.index, innerIndex }]);
            } else {
              selectedArr[selectedIndex].innerIndex = innerIndex;
              setSelectedArr([...selectedArr]);
            }
          };

          const selectedObj = selectedArr.find((obj) => obj.section === data.section.section && obj.index === data.index);
          const selectedIndex = selectedObj ? selectedObj.innerIndex : null;

          return <DinnerSelect selectedIndex={selectedIndex} setSelectedIndex={changeSelected} items={data.item} />;
        }}
        renderSectionHeader={({ section: { section } }) => <Text style={dinnerViewStyles.title}>{section}</Text>}
      />
    </View>
  );
};

export default DinnerView;
