import { TokenResponse } from 'expo-auth-session';

export type Authorised = {
	id: string;
	secret: string;
	authorised: true;
	token: TokenResponse;
};

export type UnAuthorised = {
	id: undefined;
	secret: undefined;
	authorised: false;
	token: undefined;
};

export const unauthorisedState: UnAuthorised = {
	authorised: false,
	id: undefined,
	secret: undefined,
	token: undefined,
};
