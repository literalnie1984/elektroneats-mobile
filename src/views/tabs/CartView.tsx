import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { cartViewStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {FlashList} from "@shopify/flash-list";

const CartPanelSummary = (props) => {
		return(
				<View style={cartViewStyles.summary}>
						<View style={cartViewStyles.summaryInfo}>
								<Pressable style={cartViewStyles.summaryInfoHeader} onPress={props.summaryCollapseHandler} >
										<Text style={cartViewStyles.summaryInfoHeaderContent}>Podsumowanie</Text>
										<FontAwesomeIcon
												icon={props.isSummaryCollapsed ? faChevronDown : faChevronUp}
												color={cartViewStyles.summaryInfoHeaderIcon.color}
												size={cartViewStyles.summaryInfoHeaderIcon.width}
										/>
								</Pressable>
								<View style={cartViewStyles.summaryInfoRows}>
									<View style={cartViewStyles.summaryInfoRow}>
										<Text style={cartViewStyles.summaryInfoRowLabel}>
												Suma:
										</Text>
										<Text style={cartViewStyles.summaryInfoRowContent}>
												{props.cartValue}
										</Text>
									</View>
								    <View style={cartViewStyles.summaryInfoRow}>
										<Text style={cartViewStyles.summaryInfoRowLabel}>
												Data odbioru:
										</Text>
										<Text style={cartViewStyles.summaryInfoRowContent}>
												{props.cartPickupDate}
										</Text>
									</View>
								</View>
						</View>
						<View style={cartViewStyles.summaryActionsRow}>
								<Pressable
										style={cartViewStyles.summaryActionButton}
										android_ripple={{
												color: "#2d56d2",
												borderless: false,
												radius: 100,
												foreground: false,
										}}
										onPress={() => console.log("aha")}
								>
										<Text style={cartViewStyles.summaryActionLabel}>
												Zamawiam i płacę
										</Text>
								</Pressable>
								<Pressable
										style={cartViewStyles.summaryActionButton}
										android_ripple={{
												color: "#2d56d2",
												borderless: false,
												radius: 80,
												foreground: false,
										}}
										onPress={() => console.log("bywa")}
								>
										<Text style={cartViewStyles.summaryActionLabel}>
												Wyczyść
										</Text>
								</Pressable>
						</View>
				</View>
		);
};

const CartPanel = (props) => {
		return(
				<View style={cartViewStyles.cartPanel}>
						<Pressable style={cartViewStyles.cartPanelHeader} onPress={props.panelExpansionHandler}>
								<Text style={cartViewStyles.cartPanelHeaderContent}>Zawartość koszyka</Text>
								<FontAwesomeIcon
										icon={props.isPanelExpanded ? faChevronUp : faChevronDown}
										color={cartViewStyles.cartPanelHeaderIcon.color}
										size={cartViewStyles.cartPanelHeaderIcon.width}
								/>
						</Pressable>
				</View>
		);
};

/**
		<FlashList 
								data={}
								renderItem={}
								ListEmptyComponent={}
								ListHeaderComponent={<Text style={cartViewStyles.cartPanelHeader}>Twoje zamówienia</Text>}
						/>
**/

const CartView = () => {

		const [ isSummaryCollapsed, setIsSummaryCollapsed ] = useState(false);
		const [ isPanelExpanded, setIsPanelExpanded ] = useState(false);

  return (
    <View style={cartViewStyles.root}>
      <CartPanel 
		isPanelExpanded={isPanelExpanded}
		panelExpansionHandler={() => setIsPanelExpanded(!isPanelExpanded)}
	  />
      <CartPanelSummary 
		summaryCollapseHandler={() => setIsSummaryCollapsed(!isSummaryCollapsed)} 
		isSummaryCollapsed={isSummaryCollapsed} cartValue={21.37} 
		cartPickupDate={"coś"}
      />
    </View>
  );
};

export default CartView;
