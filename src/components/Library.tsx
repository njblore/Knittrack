import { Box, Text } from '@react-native-material/core';
import axios from 'axios';
import { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { LibraryVolume } from '../data/library';

import { Project } from '../data/projects';

export function Component(props: { volumes: Array<LibraryVolume> }) {
	console.log(props.volumes);
	return (
		<ScrollView>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					width: '100%',
					justifyContent: 'space-evenly',
				}}
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
			</View>
		</ScrollView>
	);
}
