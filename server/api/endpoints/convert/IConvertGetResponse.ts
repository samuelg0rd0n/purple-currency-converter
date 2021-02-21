import { IStats } from '../../../caching/IStats';

export interface IConvertGetResponse {
	from: string,
	to: string,
	amount: number,
	converted: number,
	stats: IStats,
}