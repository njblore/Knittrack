import { Stack } from '@react-native-material/core';
import { Image, Pressable } from 'react-native';
import { LibraryVolume } from '../data/library';

export function Component(props: {
	volume: LibraryVolume;
	setVolumeDetails: (id: number) => void;
}) {
	return (
		<Stack
			spacing={10}
			style={{
				width: 100,
				height: 100,
			}}
		>
			{props.volume.small_image_url && (
				<Pressable
					onPress={() => {
						props.setVolumeDetails(props.volume.pattern_id);
					}}
				>
					<Image
						style={{ width: 100, height: 100 }}
						source={{ uri: props.volume.small_image_url }}
					/>
				</Pressable>
			)}
		</Stack>
	);
}
