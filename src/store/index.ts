import { DocumentStore } from 'ravendb';
import type { IAuthOptions } from 'ravendb';

type StrifeOptions = {
	certificate: string;
	certificatePassword: string;
	databaseUrls: string[];
	teamDbName: string;
};

function verifyOptions(options: StrifeOptions) {
	return Object.values(options).every((opt) => opt.length > 0);
}

// replaced??
const strifeOptions: StrifeOptions = {
	certificate: import.meta.env.STRIFE_CERTIFICATE || '',
	certificatePassword: import.meta.env.STRIFE_CERTIFICATE_PASSWORD || '',
	databaseUrls: import.meta.env.STRIFE_DATABASE_URLS?.split(',') || [],
	teamDbName: import.meta.env.STRIFE_DATABASE || '',
};

if (!verifyOptions(strifeOptions)) {
	throw new Error(`One or more Strife connection options are missing`);
}

const authOptions: IAuthOptions = {
	certificate: Buffer.from(strifeOptions.certificate, 'base64'),
	type: 'pfx',
	password: strifeOptions.certificatePassword,
};

const store = new DocumentStore(strifeOptions.databaseUrls, strifeOptions.teamDbName, authOptions);

store.initialize();

export default store;
