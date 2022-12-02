import { Button, Stack, Text } from '@react-native-material/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { decode, encode } from 'base-64';
import { Project } from '../data/projects';
import { RAV_KEY, RAV_PASSWORD, RAV_USER } from '@env';
import * as Projects from './Projects';
import { LibraryVolume } from '../data/library';
import * as Library from './Library';
import { StatusBar } from 'expo-status-bar';

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
		<>
			<StatusBar translucent />
			<ScrollView stickyHeaderIndices={[0]}>
				<Text
					style={{ backgroundColor: 'white' }}
					variant="h3"
				>
					Knittrack
				</Text>
				<Stack spacing={20}>
					<Stack
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
					</Stack>

					{view === 'projects' && <Projects.Component projects={projects} />}
					{view === 'library' && <Library.Component volumes={volumes} />}
				</Stack>
			</ScrollView>
		</>
	);
}
