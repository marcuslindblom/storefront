declare module '@strifeapp/strife' {
	export function ready(): void;
	export function subscribe(callback: (data: any) => void): () => void;
}
