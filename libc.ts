export function strlen(str: i32): i32
{
    let length: i32 = 0;
    while (load<u8>(str) != 0)
    {
        ++str;
        ++length;
    }
    return length;
}

export function streq(a: i32, b: i32): bool
{
    while (true)
    {
        let a_c = load<u8>(a++);
        let b_c = load<u8>(b++);
        if (a_c != b_c)
        {
            return false;
        }
        if (a_c == 0)
        {
            break;
        }
    }
    return true;
}

export function strstr(haystack: i32, needle: i32): i32
{
    // If the needle is an empty string, return the beginning of the haystack
    if (load<u8>(needle) == 0)
    {
        return haystack;
    }

    // Iterate over the haystack
    while (load<u8>(haystack) != 0)
    {
        // If the current character matches the first character of the needle,
        // check for the rest of the needle
        if (load<u8>(haystack) == load<u8>(needle)) 
        {
            let needlePtr: i32 = needle;
            let potentialMatchPtr: i32 = haystack;
            while (true)
            {
                if (load<u8>(needlePtr) == 0)
                {
                    // Found the needle
                    return haystack;
                }
                if (load<u8>(potentialMatchPtr) != load<u8>(needlePtr))
                {
                    break; // Not a match, break the inner loop
                }
                needlePtr++;
                potentialMatchPtr++;
            }
        }
        haystack++;
    }

    // If the loop completes, the needle was not found
    return 0;
}
