import { View, Text, SectionList, ScrollView, Image, TouchableOpacity } from "react-native";
import { dinnerViewStyles } from "../../styles";
import { useState } from "react";

interface DinnerItem {
  name: string;
  uri: string;
}

interface DinnerData {
  section: string;
  data: DinnerItem[][];
}

interface DinnerItemProps {
  name: string;
  uri: string;
  backgroundColor: string;
  onPress: () => void;
}

type InnerIndex = number | null;

interface SelectedDinnerItem {
  section: string;
  index: number;
  innerIndex: InnerIndex;
}

interface DinnerSelectProps {
  selectedIndex: InnerIndex;
  setSelectedIndex: (innerIndex: InnerIndex) => void;
  items: DinnerItem[];
}

const placeholderUri = "https://i.imgur.com/ejtUaJJ.png";
const DATA: DinnerData[] = [
  {
    section: "Main dish",
    data: [
      [
        { name: "Kotlet schabowy panierowany", uri: placeholderUri },
        { name: "Zraz drobiowy", uri: placeholderUri },
        { name: "Kluski śląskie z sosem myśliwskim", uri: placeholderUri },
      ],
    ],
  },
  {
    section: "Extras",
    data: [
      [
        { name: "Ziemniaki", uri: placeholderUri },
        { name: "Ryż", uri: placeholderUri },
      ],
      [{ name: "Surówka", uri: placeholderUri }],
      [{ name: "Kompot", uri: placeholderUri }],
    ],
  },
  {
    section: "Soup",
    data: [[{ name: "Pomidorowa z makaronem", uri: placeholderUri }]],
  },
];

const Item = ({ name, uri, backgroundColor, onPress }: DinnerItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[dinnerViewStyles.itemView, { backgroundColor }]}>
        <Image style={dinnerViewStyles.itemImg} source={{ uri }} />
        <Text style={dinnerViewStyles.itemTitle}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Select = ({ selectedIndex, setSelectedIndex, items }: DinnerSelectProps) => {
  return (
    <ScrollView horizontal={true} nestedScrollEnabled={false}>
      {items.map(({ name, uri }, index) => {
        const backgroundColor = index === selectedIndex ? "#ffffff" : "#bfbdbd";

        return (
          <Item
            key={index}
            onPress={() => {
              if (selectedIndex === index) setSelectedIndex(null);
              else setSelectedIndex(index);
            }}
            name={name}
            uri={uri}
            backgroundColor={backgroundColor}
          />
        );
      })}
    </ScrollView>
  );
};

const DinnerView = ({ route, navigation }) => {
  const [selectedArr, setSelectedArr] = useState<SelectedDinnerItem[]>([]);

  return (
    <View style={dinnerViewStyles.container}>
      <SectionList
        sections={DATA}
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

          return <Select selectedIndex={selectedIndex} setSelectedIndex={changeSelected} items={data.item} />;
        }}
        renderSectionHeader={({ section: { section } }) => <Text style={dinnerViewStyles.title}>{section}</Text>}
      />
    </View>
  );
};

export default DinnerView;
