import { Modal, TouchableOpacity } from 'react-native';

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
				{props.children}
			</TouchableOpacity>
		</Modal>
	);
}
