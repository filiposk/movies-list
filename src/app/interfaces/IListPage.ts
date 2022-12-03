import { IMovie } from "./IMovie";

export interface IListPage{
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number
}