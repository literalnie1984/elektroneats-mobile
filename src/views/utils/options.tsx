import { Settings, Setting, SettingType, SettingHandlerBind } from "../../types/index";
import { atom, useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, Appearance } from "react-native";
import OptionSwitch from "../../components/OptionSwitch";
import OptionNumberInput from "../../components/OptionNumberInput";
import OptionTextInput from "../../components/OptionTextInput";
import OptionSlider from "../../components/OptionSlider";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { OptionPickerProps, PickerItem } from "../../types/OptionComponentsTypes";
import { optionPickerStyle } from "../../styles/OptionComponentsStyles";
import { setDark } from "../../../global";

const generateItemList = (itemArray: PickerItem[]): JSX.Element[] => {
  const componentArray: JSX.Element[] = itemArray.map((item: PickerItem) => {
    return <Picker.Item label={item.label} value={item.value} enabled={item.enabled ?? true} />;
  });

  return componentArray;
};

const OptionPicker = ({ label, tag, value, onValueChange, optionsList, enabled, mode }: OptionPickerProps) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const [settings, setSettings] = useRecoilState(settingsAtom);
  const [options, setOptions] = useState(generateItemList(optionsList));

  console.log(value);

  const setSetting = (value: any) => {
    const newSettings = settings.map((setting) => {
      if (setting.tag === tag) {
        setting = { ...setting, value };
      }
      console.log(setting);
      return setting;
    });

    setSettings(newSettings);
  };
  const handlePickChange = onValueChange ?? setSetting;

  return (
    <View style={optionPickerStyle.body}>
      <Text style={optionPickerStyle.label}>{label}</Text>
      <Picker
        style={optionPickerStyle.picker}
        selectedValue={selectedOption}
        onValueChange={(item) => {
          setSelectedOption(item);
          handlePickChange(item);
        }}
        enabled={enabled ?? true}
        mode={mode ?? "dropdown"}
        dropdownIconColor={optionPickerStyle.dropdownIcon.color}
        dropdownIconRippleColor={optionPickerStyle.dropdownRipple.color}
        itemStyle={optionPickerStyle.itemStyle}
      >
        {options}
      </Picker>
    </View>
  );
};

export default OptionPicker;

export const settingsAtom = atom<Settings>({ key: "settings", default: undefined });

export const Options = () => {
  const [settings, setSettings] = useRecoilState(settingsAtom);

  const readSettingsFromStorage = async () => {
    try {
      const readSettings = await AsyncStorage.getItem("settings");
      if (readSettings === null) throw new Error("No messages in storage");
      setSettings(JSON.parse(readSettings));
    } catch (error) {
      console.log("Using default settings");
      await writeSettingsToStorage();
      setSettings(defaultSettings);
    }
  };

  const writeSettingsToStorage = async () => {
    try {
      const settingsJSON = JSON.stringify(settings);
      await AsyncStorage.setItem("settings", settingsJSON);
      settings.map((setting) => {
        AsyncStorage.setItem(`setting_${setting.tag}`, JSON.stringify(setting.value)).then(
          () => {
            console.log(`setting ${setting.tag} saved in storage`);
          },
          () => {
            console.log(`failed saving setting ${setting.tag}!`);
          }
        );
      });
    } catch (error) {
      ToastAndroid.show("Wystąpił błąd podczas zapisu ustawień", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    readSettingsFromStorage();
  }, []);

  useEffect(() => {
    writeSettingsToStorage().then(() => {
      let themeSetting = getSetting("theme", settings)[0].value;
      if (themeSetting === "system") {
        themeSetting = Appearance.getColorScheme();
      }
      setDark(themeSetting === "dark");
    });
  }, [settings]);

  return null;
};

export const getSettingsByMenu = (menu: string, settingsList: Settings): Settings => {
  return settingsList.filter((setting: Setting) => setting.menu === menu);
};

export const getSettingsBySection = (section: string, settingsList: Settings): Settings => {
  return settingsList.filter((setting: Setting) => setting.section === section);
};

export const getSetting = (tag: string, settings: Settings) => {
  return settings.filter((setting: Setting) => setting.tag === tag);
};

export const setSetting = (tag: string, value: any): void => {
  const [settings, setSettings] = useRecoilState(settingsAtom);

  let [setting] = settings.filter((item) => item.tag === tag);
  setting.value = value;
  setSettings([...settings, setting]);
};

export const parseSettingsToComponents = (settings: Settings, handlerBinds?: SettingHandlerBind[]): JSX.Element[] | undefined[] => {
  const componentList = settings.map((setting) => {
    switch (setting.type) {
      case SettingType.Switch:
        {
          const handlerBind = handlerBinds?.filter((bind) => bind.tag === setting.tag)[0] || null;
          return <OptionSwitch label={setting.name} tag={setting.tag} state={setting.value} tagTrue={setting.props.tagTrue} tagFalse={setting.props.tagFalse} disabled={setting.disabled} handleSwitch={handlerBind?.handler} />;
        }
        break;

      case SettingType.Dropdown:
        {
          const handlerBind = handlerBinds?.filter((bind) => bind.tag === setting.tag)[0] || null;
          return <OptionPicker label={setting.name} tag={setting.tag} value={setting.value} optionsList={setting.props.optionsList} onValueChange={handlerBind?.handler} enabled={!settings.props?.disabled} mode={setting.props.mode} />;
        }
        break;

      case SettingType.InputNum:
        {
          const handlerBind = handlerBinds?.filter((bind) => bind.tag === setting.tag)[0] || null;
          return <OptionNumberInput name={setting.name} tag={setting.tag} value={setting.value} minVal={setting.props.minVal} maxVal={setting.props.maxVal} disabled={setting.disabled} handleValueChange={handlerBind?.handler} />;
        }
        break;

      case SettingType.Slider:
        {
          const handlerBind = handlerBinds?.filter((bind) => bind.tag === setting.tag)[0] || null;
          return <OptionSlider label={setting.name} tag={setting.tag} maxValue={setting.props.maxVal} minValue={setting.props.minVal} value={setting.value} disabled={setting.disabled} handleValueChange={handlerBind?.handler} />;
        }
        break;

      case SettingType.InputText:
        {
          const handlerBind = handlerBinds?.filter((bind) => bind.tag === setting.tag)[0] || null;
          return <OptionTextInput name={setting.name} tag={setting.tag} value={setting.value} maxLen={setting.props?.maxLen} disabled={setting.disabled} handleValueChange={handlerBind?.handler} />;
        }
        break;
    }
  });

  return componentList;
};

const defaultSettings: Settings = [
  {
    name: "Motyw",
    tag: "theme",
    section: "Wygląd",
    menu: "Wygląd",
    type: SettingType.Dropdown,
    value: "dark",
    disabled: false,
    props: {
      mode: "dialog",
      optionsList: [
        {
          label: "Ciemny",
          value: "dark",
        },
        {
          label: "Jasny",
          value: "light",
        },
        {
          label: "Systemowy",
          value: "system",
        },
      ],
    },
  },
  {
    name: "Ekran startowy",
    tag: "launch_screen",
    section: "Działanie",
    menu: "Wygląd",
    type: SettingType.Dropdown,
    value: "orders",
    disabled: false,
    props: {
      mode: "dialog",
      optionsList: [
        {
          label: "Jadłospis",
          value: "menu",
        },
        {
          label: "Koszyk",
          value: "cart",
        },
        {
          label: "Zamówienia",
          value: "orders",
        },
      ],
    },
  },
  {
    name: "Ustawienia deweloperskie",
    tag: "dev_settings",
    section: "Zaawansowane",
    menu: "Pozostałe",
    type: SettingType.Switch,
    value: true,
    disabled: false,
    props: {
      tagTrue: "ON",
      tagFalse: "OFF",
    },
  },
  {
    name: "Dziennikowanie",
    tag: "logging",
    section: "Zaawansowane",
    menu: "Pozostałe",
    type: SettingType.Switch,
    value: false,
    disabled: false,
    props: {
      tagTrue: "ON",
      tagFalse: "OFF",
    },
  },
  {
    name: "Pokaż token użytkownika",
    tag: "show_jwt",
    section: "Zaawansowane",
    menu: "Pozostałe",
    type: SettingType.Switch,
    value: true,
    disabled: false,
    props: {
      tagTrue: "ON",
      tagFalse: "OFF",
    },
  },
  {
    name: "Wyświetlaj wiadomości Toast dla statusu zapytań",
    tag: "fetch_status_toast",
    section: "Zaawansowane",
    menu: "Pozostałe",
    type: SettingType.Switch,
    value: false,
    disabled: false,
    props: {
      tagTrue: "ON",
      tagFalse: "OFF",
    },
  },
];
