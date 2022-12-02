import { Wrap } from '@react-native-material/core';
import { Image } from 'react-native';
import { LibraryVolume } from '../data/library';

export function Component(props: { volumes: Array<LibraryVolume> }) {
	return (
		<Wrap
			fill
			inline
			spacing={10}
			shouldWrapChildren
			center
		>
			{props.volumes
				.filter((p) => p.small_image_url)
				.map(
					(p) =>
						p.small_image_url && (
							<Image
								key={p.id}
								style={{ width: 100, height: 100 }}
								source={{ uri: p.small_image_url }}
							/>
						),
				)}
		</Wrap>
	);
}
