import { useEffect, useState } from 'react';
import * as Home from './src/components/Home';
import * as AuthSession from 'expo-auth-session';
import { Button, Stack } from '@react-native-material/core';
import { Authorised, UnAuthorised, unauthorisedState } from './src/data/auth';
import { OAUTH_CLIENT_ID, OAUTH_SECRET } from '@env';

export default function App() {
	const [authState, setAuthState] = useState<Authorised | UnAuthorised>(
		unauthorisedState,
	);
	const redirectUri = AuthSession.makeRedirectUri({
		scheme: 'app.knittrack://',
		useProxy: false,
	});

	const [request, response, promptAsync] = AuthSession.useAuthRequest(
		{
			clientId: OAUTH_CLIENT_ID,
			redirectUri,
			clientSecret: OAUTH_SECRET,
			scopes: ['offline', 'patternstore-read'],
		},
		{
			authorizationEndpoint: 'https://www.ravelry.com/oauth2/auth',
			tokenEndpoint: 'https://www.ravelry.com/oauth2/token',
		},
	);

	useEffect(() => {
		if (response?.type === 'success' && request) {
			const { code } = response.params;

			AuthSession.exchangeCodeAsync(
				{
					code,
					clientId: OAUTH_CLIENT_ID,
					redirectUri,
					scopes: ['offline', 'patternstore-read'],
					clientSecret: 'T8sNd5_4/1Goo/J615qHv9XOdw7oEhDQTuF9dKoY',
				},
				{ tokenEndpoint: 'https://www.ravelry.com/oauth2/token' },
			)
				.then((token) => {
					setAuthState({
						authorised: true,
						secret: OAUTH_SECRET,
						id: OAUTH_CLIENT_ID,
						token: token,
					});
				})
				.catch((err) => console.error(err));
		}
	}, [response, request]);

	return authState.authorised ? (
		<Home.Component
			logout={() => setAuthState(unauthorisedState)}
			authToken={`Bearer ${authState.token.accessToken}`}
		></Home.Component>
	) : (
		<Stack
			style={{ height: '100%' }}
			center
		>
			<Button
				disabled={!request}
				title="Login"
				onPress={() => {
					promptAsync();
				}}
			/>
		</Stack>
	);
}
