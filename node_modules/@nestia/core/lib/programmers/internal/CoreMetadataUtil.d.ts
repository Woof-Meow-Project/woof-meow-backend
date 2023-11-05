import { Metadata } from "typia/lib/schemas/metadata/Metadata";
export declare namespace CoreMetadataUtil {
    const atomics: (meta: Metadata) => Set<"boolean" | "bigint" | "number" | "string">;
    const isUnion: (meta: Metadata) => boolean;
}
