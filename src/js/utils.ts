export const FERRIS_EPOCH_MS: number = 1_577_836_800_000;

export function parseSnowflake(snowflake: string | bigint): Date {
    if (typeof snowflake === 'string')
        snowflake = BigInt(snowflake);

    return new Date(Number(snowflake >> 64n) + FERRIS_EPOCH_MS)
}