import { Box, Text } from '@react-native-material/core';
import axios from 'axios';
import { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { decode, encode } from 'base-64';
import { Project } from '../data/projects';
import { RAV_KEY, RAV_PASSWORD, RAV_USER } from '@env';

// Fixes an issue in the axios base64 encoding
if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

export function Component(props: {}) {
	axios
		.get(`https://api.ravelry.com/projects/${RAV_USER}/list.json`, {
			auth: {
				username: RAV_KEY,
				password: RAV_PASSWORD,
			},
		})
		.then((res) => {
			setProjects(res.data.projects);
		})
		.catch((error) => console.error(error));

	const [projects, setProjects] = useState<Array<Project>>([]);

	return (
		<View>
			<Text variant="h2">Knittrack</Text>
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
					{projects
						.filter((p) => p.first_photo?.small2_url)
						.map(
							(p) =>
								p.first_photo?.small2_url && (
									<Image
										key={p.id}
										style={{ width: 100, height: 100 }}
										source={{ uri: p.first_photo?.small2_url }}
									/>
								),
						)}
				</View>
			</ScrollView>
		</View>
	);
}
