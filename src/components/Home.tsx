import { Box, Button, Flex, Text } from '@react-native-material/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { decode, encode } from 'base-64';
import { Project } from '../data/projects';
import { RAV_KEY, RAV_PASSWORD, RAV_USER } from '@env';
import * as Projects from './Projects';
import { LibraryVolume } from '../data/library';
import * as Library from './Library';

// Fixes an issue in the axios base64 encoding
if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

export function Component(props: {}) {
	const [projects, setProjects] = useState<Array<Project>>([]);
	const [volumes, setLibrary] = useState<Array<LibraryVolume>>([]);
	const [view, setView] = useState<'projects' | 'library'>('projects');

	useEffect(() => {
		const axiosInstance = axios.create({
			auth: {
				username: RAV_KEY,
				password: RAV_PASSWORD,
			},
		});

		axiosInstance
			.get(`https://api.ravelry.com/projects/${RAV_USER}/list.json`)
			.then((res) => {
				setProjects(res.data.projects);
			})
			.catch((error) => console.error(error));

		axiosInstance
			.get(`https://api.ravelry.com/people/${RAV_USER}/library/search.json `)
			.then((res) => {
				setLibrary(res.data.volumes);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<View>
			<Text variant="h2">Knittrack</Text>
			<Flex
				direction="row"
				justify="around"
			>
				<Button
					title="Projects"
					onPress={() => setView('projects')}
				/>
				<Button
					title="Library"
					onPress={() => setView('library')}
				/>
			</Flex>
			<Box></Box>
			{view === 'projects' && <Projects.Component projects={projects} />}
			{view === 'library' && <Library.Component volumes={volumes} />}
		</View>
	);
}
