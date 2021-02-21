export interface IFixerGetResponse {
	success: boolean,
	timestamp?: number,
	base?: string,
	date?: string,
	rates?: {
		[key: string]: number
	},
	error?: {
		code: number,
		type: string,
	}
}