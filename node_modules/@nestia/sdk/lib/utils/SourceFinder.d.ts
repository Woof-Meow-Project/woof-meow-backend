export declare namespace SourceFinder {
    const find: (props: IProps) => Promise<string[]>;
}
interface IProps {
    exclude?: string[];
    include: string[];
    filter: (location: string) => boolean;
}
export {};
