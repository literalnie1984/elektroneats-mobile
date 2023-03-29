import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
  accountView: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export const menuViewStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  menu: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  menuBlankContainerStyle: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  menuBlankWindowStyle: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  menuBlankIconStyle: {
    fontSize: 96,
    color: "#2246b6",
  },
  menuBlankHeadingStyle: {
    textAlign: "center",
    fontSize: 48,
    color: "#2246b6",
  },
  menuBlankTextStyle: {
    textAlign: "center",
    fontSize: 16,
    color: "#2246b6",
  },
  menuItem: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  menuItemSeparator: {
    height: 40,
  },
  menuItemContainer: {
    width: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#2247b7",
  },
  menuItemBar: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: "#2246b6",
    borderRadius: 10,
    color: "#fff",
    width: "100%",
    height: 50,
  },
  menuItemBarDate: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
  },
  menuItemBarFolded: {
    borderRadius: 10,
  },
  menuItemBarUnfolded: {
    borderRadius: 10,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  menuVariant: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    width: "100%",
    backgroundColor: "#557dfa",
    rowGap: 10,
    flexGrow: 1,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  menuVariantRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  menuVariantRowTitle: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#fff",
    width: "30%",
  },
  menuVariantActionRow: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuVariantActionButton: {
    backgroundColor: "#2246b6",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  menuVariantActionButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },
  menuVariantElement: {
    width: "70%",
    textAlign: "center",
    color: "#fff",
  },
});

export const orderViewStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    color: "#808080",
    marginLeft: 20,
    marginBottom: 10,
  },
  orderContainer: {
    marginBottom: 15,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  topPressableContainer: {
    backgroundColor: "#2246b6",
    color: "#fff",
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 40,
  },
  expandableContainer: {
    backgroundColor: "#557dfa",
    color: "#fff",
    width: "85%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  orderText: {
    color: "#fff",
    fontSize: 18,
  },
  noBottomBorder: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export const cartViewStyles = StyleSheet.create({
  root: {
    flex: 1,
    margin: "2.5%",
    gap: 15,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cartPanel: {
    width: "100%",
    flex: 1,
    backgroundColor: "#2347b6",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 25,
    gap: 10,
  },
  cartPanelList: {
    backgroundColor: "#2347b6",
  },
  cartPanelHeader: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  cartPanelHeaderContent: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  cartPanelHeaderIcon: {
    color: "#fff",
    width: 36,
  },
  cartPanelBlank: {
    width: "auto",
    height: "auto",
    padding: 25,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cartPanelBlankIcon: {
    color: "#fff",
    width: 64,
  },
  cartPanelBlankHeader: {
    textAlign: "center",
    fontSize: 32,
    color: "#fff",
  },
  cartPanelBlankText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
  summary: {
    width: "100%",
    backgroundColor: "#2347b6",
    flexDirection: "column",
    paddingVertical: 5,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  summaryInfo: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 25,
  },
  summaryInfoHeader: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  summaryInfoHeaderContent: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  summaryInfoHeaderIcon: {
    color: "#fff",
    width: 32,
  },
  summaryInfoRows: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    overflow: "hidden",
  },
  summaryInfoRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  summaryInfoRowLabel: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    width: "40%",
  },
  summaryInfoRowContent: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    flex: 1,
  },
  summaryActionsRow: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  summaryActionButton: {
    padding: 10,
    backgroundColor: "#152863",
    borderRadius: 10,
  },
  summaryActionLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
  },
  cartMealRoot: {
    width: "100%",
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  cartMeal: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: "#3266fe",
    overflow: "hidden",
  },
  cartMealInfoBar: {
    height: 60,
    width: "100%",
    flexShrink: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cartMealName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  cartMealCost: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  cartMealInfoIcon: {
    color: "#fff",
    width: 24,
  },
  cartMealOptions: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  cartMealActionsBar: {
    height: "auto",
    width: "100%",
    flexShrink: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  cartMealActionButton: {
    backgroundColor: "#B1B2B5",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  cartMealActionLabel: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
});

export const moreViewStyles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: "10%",
  },
  optionButton: {
    width: "100%",
    height: "auto",
    padding: 5,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#3266fe",
  },
  optionButtonIcon: {
    color: "#3266fe",
    width: 28,
  },
  optionButtonLabel: {
    color: "#3266fe",
    fontSize: 24,
    textAlign: "center",
  },
});

export const dinnerViewStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#808080",
    marginLeft: 20,
    marginBottom: 10,
  },
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 10,
  },
  itemView: {
    backgroundColor: "#bfbdbd",
    width: 200,
    height: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  itemImg: {
    width: 150,
    height: 150,
  },
  itemTitle: {
    fontSize: 18,
    textAlign: "center",
  },
});
