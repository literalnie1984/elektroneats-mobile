import { View, Text } from 'react-native';
import { securitySettingsStyle } from '../../../styles/OptionViewsStyles';

const SecurityOptionsView = ({navigation}) => {
		return(
				<View style={securitySettingsStyle.root}>
						<Text>Security Settings View</Text>
				</View>
		);
}

export default SecurityOptionsView;
