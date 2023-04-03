import { StyleSheet } from "react-native";
import { COLORS } from "../views/colors";

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
    paddingHorizontal: 20,
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
    borderRadius: 20,
    shadowColor: COLORS.chestnut,
    elevation: 6,
  },
  menuItemSeparator: {
    height: 20,
  },
  menuItemContainer: {
    width: "100%",
    // flexDirection: "column",
    flexWrap: "nowrap",
    overflow: "hidden",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: COLORS.white,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  menuItemBar: {
    // flexDirection: "row",
    // flexWrap: "nowrap",
    // alignItems: "center",
    // justifyContent: "space-between",
    // paddingLeft: 25,
    // paddingRight: 25,
    // backgroundColor: COLORS.colar,
    // color: "#fff",
    // width: "100%",
    // height: 50,
  },
  menuItemBarDate: {
    color: "#fff",
    textAlign: "center",
    backgroundColor: COLORS.colar,
    width: "100%",
    fontSize: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 6,
  },
  // menuItemBarFolded: {
  //   borderRadius: 10,
  // },
  // menuItemBarUnfolded: {
  //   borderRadius: 10,

  // },
  menuVariant: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    width: "100%",
    backgroundColor: COLORS.white,
    rowGap: 10,
    flexGrow: 1,
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
    color: "#000",
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
    color: "#000",
  },
});

export const cartViewStyles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 15,
    // flexDirection: "column",
    // flexWrap: "nowrap",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    // height: '100%',
    // margin: '2.5%'
  },
  cartPanel: {
    flex: 1,
    width: "100%",
    // borderRadius: 15,
    // paddingHorizontal: 15,
    // paddingVertical: 25,
    gap: 10,
  },
  cartPanelList: {
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "transparent",
    height: "80%",
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
    color: "#000",
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
    color: "#000",
    width: 64,
  },
  cartPanelBlankHeader: {
    textAlign: "center",
    fontSize: 32,
    color: "#000",
  },
  cartPanelBlankText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
  },
  summary: {
    width: "100%",
    backgroundColor: "#2347b6",
    flexDirection: "column",
    paddingVertical: 5,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 15,
    marginVertical: 10,
    // paddingHorizontal: 20,
    // overflow: "hidden",
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
  cartMeal: {
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: COLORS.chestnut,
    elevation: 6,
    margin: 10,
    paddingHorizontal: 20,
    padding: 10,
  },
  cartMealImage: {
    height: 80,
    width: 80,
  },
  cartMealImageContainer: {
    height: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  cartMealMainContent: {
    width: "75%",
    height: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  cartMealInfoBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 30,
  },
  cartMealName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  cartMealCost: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  cartMealInfoIcon: {
    color: "#000",
    width: 24,
  },
  cartMealActionsBar: {
    height: "auto",
    width: "100%",
    flexShrink: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
  },
  cartMealActionButton: {
    backgroundColor: "#B1B2B5",
    // padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  cartMealAmountOptions: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    borderRadius: 10,
    gap: 16,
  },
  cartMealManageButton: {
    padding: 5,
  },
  cartMealManageButtonIcon: {
    color: COLORS.chestnut,
    width: 16,
  },
  cartMealAmountButton: {
    padding: 5,
    borderRadius: 100,
    borderWidth: 1,
  },
  cartMealAmountButtonIcon: {
    width: 12,
  },
  cartMealAmountLabel: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  cartPanelDebugButton: {
    backgroundColor: "#2246b6",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  cartPanelDebugButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },
  cartItem: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#3266fe",
    overflow: "hidden",
  },
  cartItemImageContainer: {
    width: "40%",
    height: "100%",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cartItemImage: {
    height: 100,
    width: 100,
  },
  cartItemMainContainer: {
    height: "100%",
    width: "60%",
    paddingVertical: 15,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  cartItemInfoBar: {
    width: "auto",
    height: "auto",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 25,
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

export const authStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innerContainer: { paddingTop: 50, paddingHorizontal: 20 },
  appName: {
    fontSize: 45,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 40,
    color: COLORS.chestnut,
  },
  screenTitle: { color: COLORS.black, fontSize: 30, fontWeight: "bold" },
  screenDescription: { color: COLORS.grey, fontSize: 18, marginVertical: 10 },
  changeScreenButton: {
    color: COLORS.darkerColar,
    fontWeight: "bold",
  },
});

export const paymentStyle = StyleSheet.create({
  paymentRoot: {
    flex: 1,
    paddingVertical: "15%",
    paddingHorizontal: 25,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "space-around",
    backgroundColor: COLORS.magnolia,
  },
  paymentPanel: {
    flex: 1,
    padding: 25,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentHeader: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 30,
    flexShrink: 1,
  },
  paymentHeaderText: {
    fontSize: 20,
    textAlign: "left",
    color: COLORS.colar,
  },
  paymentSpinner: {
    color: COLORS.saffron,
  },
  paymentWalletInfoPanel: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  paymentWalletInfoText: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.gunmetal,
  },
  paymentWalletInfoButton: {
    color: COLORS.colar,
  },
  paymentTopUpInfoPanel: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  paymentTopUpInfoText: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.gunmetal,
  },
  paymentTopUpInfoButton: {
    color: COLORS.colar,
  },
  paymentWalletRoot: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 25,
  },
  paymentWalletRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  paymentWalletRowLabel: {
    fontSize: 18,
    textAlign: "left",
    color: COLORS.colar,
    width: "45%",
  },
  paymentWalletRowInput: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.gunmetal,
    flexGrow: 1,
  },
  paymentWalletAddressView: {
    borderColor: COLORS.chestnut,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 15,
    padding: 10,
  },
  paymentWalletAddresViewLabel: {
    color: COLORS.gunmetal,
    fontSize: 24,
    textAlign: "left",
    marginBottom: 15,
  },
  paymentWalletButtonRow: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    rowGap: 15,
  },
  paymentWalletButtonLabel: {
    fontSize: 20,
    textAlign: "center",
    color: COLORS.whiteColar,
  },
  paymentWalletButton: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: COLORS.colar,
    borderRadius: 10,
  },
  paymentTopUpRoot: {
    flex: 1,
    backgroundColor: COLORS.magnolia,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    gap: 35,
    alignItems: "stretch",
  },
  paymentTopUpRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  paymentTopUpText: {
    fontSize: 18,
    textAlign: "left",
    color: COLORS.colar,
  },
  paymentTopUpInput: {
    flexGrow: 1,
    fontSize: 16,
    textAlign: "center",
    color: COLORS.gunmetal,
    padding: 5,
  },
  paymentTopUpButton: {
    color: COLORS.colar,
  },
  paymentCheckoutRoot: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 25,
  },
  paymentCheckoutText: {
    fontSize: 20,
    textAlign: "center",
    color: COLORS.gunmetal,
  },
  paymentCheckoutButton: {
    color: COLORS.colar,
  },
});

export const orderViewStyles = StyleSheet.create({
  container: {
    // backgroundColor: '#ebf2ff',
    // backgroundColor: '#f5f8ff',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    color: COLORS.colar,
    // fontWeight: 'bold',
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

export const newOrder = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  orderContainer: {
    backgroundColor: "#fff",
    // borderColor: '#afc0ed',
    // borderWidth: 1,
    marginBottom: 24,
    padding: 10,
    width: "90%",
    borderRadius: 10,
    shadowColor: COLORS.chestnut,
    elevation: 6,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginHorizontal: 12,
  },
  pairRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  pairItem: {
    marginVertical: 8,
  },
  buttonText: {
    textAlign: "right",
    fontSize: 13,
    color: "#525e70",
    paddingTop: 10,
    paddingBottom: 2,
  },
  label: {
    // color: "#a3a3a3",
    color: "#abb8c9",
    textTransform: "uppercase",
    fontSize: 12,
  },
  content: {
    fontSize: 16,
  },
});