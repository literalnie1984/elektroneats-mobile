interface SettingData {
  key: string;
  value: any;
  name: string;
}

interface Setting extends SettingData {
  sectionName: string;
}

interface SettingsSection {
  header: string;
  data: SettingData[];
}

type Settings = Setting[];
type SettingsSections = SettingsSection[];

export { SettingData, Setting, SettingsSection, Settings, SettingsSections };
