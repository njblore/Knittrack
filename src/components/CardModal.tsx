import { Flex, IconButton, Stack } from '@react-native-material/core';
import { Modal, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export function Component(props: {
	visible: boolean;
	onClose: () => void;
	children: JSX.Element;
}) {
	return (
		<Modal
			visible={props.visible}
			onDismiss={props.onClose}
			onRequestClose={props.onClose}
			transparent
		>
			<TouchableOpacity
				style={{
					backgroundColor: 'rgba(0,0,0,0.5)',
					flex: 1,
					justifyContent: 'center',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
				}}
				onPress={props.onClose}
			>
				<Stack
					style={{
						width: '60%',
						height: '60%',
						backgroundColor: 'white',
						borderRadius: 5,
					}}
				>
					<Flex
						direction="row"
						justify="end"
					>
						<IconButton
							onPress={props.onClose}
							icon={
								<Icon
									name="close"
									size={20}
								/>
							}
						/>
					</Flex>
					{props.children}
				</Stack>
			</TouchableOpacity>
		</Modal>
	);
}
