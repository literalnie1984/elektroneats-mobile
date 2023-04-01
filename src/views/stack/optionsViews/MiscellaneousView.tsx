import { SectionList } from "react-native";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { miscellaneousViewStyle } from "../../../styles/OptionViewsStyles";
import OptionSwitch from "../../../components/OptionSwitch";
import { Setting, Settings, SettingsSection, SettingsSections } from "../../../types/OptionViewsTypes";
import { setupSections } from "../../utils/options";
import OptionCheckboxList from "../../../components/OptionCheckboxList";
import { CheckboxData } from "../../../types/OptionComponentsTypes";

const defSettings: Settings = [
  {
    key: "setDebugMode",
    name: "Enable Debug Mode",
    value: true,
    sectionName: "Advanced",
  },
  {
    key: "enableLogging",
    name: "Enable Logging",
    value: true,
    sectionName: "Advanced",
  },
];


const MiscellaneousOptionsView = ({ navigation }) => {
  const [settings, setSettings] = useState(defSettings);

  let sections_data = setupSections(settings);

  useEffect(() => {
    sections_data = setupSections(settings);
  }, [settings]);

  return (
    <View style={miscellaneousViewStyle.root}>
      <SectionList
        sections={sections_data}
        renderItem={({ item, index }) => {
          return (
            <OptionSwitch
              label={item.name}
              state={item.value}
              handleSwitch={(newValue) => {
                setSettings(
                  settings.map((setting) => {
                    console.log(`Setting key: ${setting.key}; Item key: ${item.key}`);
                    if (setting.key === item.key) {
                      console.log("changed setting");
                      setting.value = newValue;
                    }
                    return setting;
                  })
                );
              }}
              disabled={false}
            />
          );
        }}
        keyExtractor={(item, index) => item + String(index)}
        renderSectionHeader={({ section: { header } }) => (
          <View style={miscellaneousViewStyle.optionsListSectionHeader}>
            <Text style={miscellaneousViewStyle.optionsListSectionHeaderText}>{header}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View>
            <Text>Blank</Text>
          </View>
        }
        ItemSeparatorComponent={(props) => <View style={miscellaneousViewStyle.itemSeparator} />}
        contentContainerStyle={miscellaneousViewStyle.optionsList}
      />
    </View>
  );
};

export default MiscellaneousOptionsView;
