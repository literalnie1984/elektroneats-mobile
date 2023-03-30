import { Setting, Settings, SettingsSections } from "../../types/OptionViewsTypes";

export const setupSections = (settings: Settings) => {
  const sectionList: string[] = [];
  let sections_data_cache: SettingsSections = [];
  settings.forEach((setting) => {
    if (!sectionList.includes(setting.sectionName + " Options")) {
      sectionList.push(setting.sectionName + " Options");
    }
  });

  sectionList.forEach((sectionName) => {
    sections_data_cache.push({
      header: sectionName,
      data: [],
    });
  });

  sections_data_cache = sections_data_cache.map((section) => {
    settings.forEach((setting: Setting) => {
      if (section.header.includes(setting.sectionName)) {
        section.data.push({
          key: setting.key,
          name: setting.name,
          value: setting.value,
        });
      }
    });

    return section;
  });

  return sections_data_cache;
};
