import { StyleSheet } from "react-native";

export const lookAndFeelStyle = StyleSheet.create({
  root: {},
});

export const paymentSettingsStyle = StyleSheet.create({
  root: {},
});

export const miscellaneousViewStyle = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "center",
  },
  optionsList: {
    width: "100%",
    padding: 5,
  },
  optionsListSectionHeader: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    width: "100%",
  },
  optionsListSectionHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
  },
  optionsListItem: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  optionsListItemText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  itemSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
});

export const securitySettingsStyle = StyleSheet.create({
  root: {},
});

export const informationsViewStyle = StyleSheet.create({
  root: {},
});
