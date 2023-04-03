import { StyleSheet } from "react-native";
import { COLORS } from "../views/colors";

export const lookAndFeelStyle = StyleSheet.create({
  root: {},
});

export const paymentSettingsStyle = StyleSheet.create({
  root: {
    flex: 1,
  },
  noWalletBody: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 25,
    backgroundColor: COLORS.whiterColar,
  },
  noWalletHeader: {
    fontSize: 20,
    color: COLORS.gunmetal,
    fontWeight: "bold",
    alignSelf: "center",
  },
  exclamationIcons: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  noWalletButton: {
    backgroundColor: COLORS.gunmetal,
    padding: 15,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  noWalletFooter: {
    fontSize: 20,
    color: COLORS.saffron,
    textAlign: "center",
  },
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
