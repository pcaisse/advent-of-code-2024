#!/usr/bin/awk -f

BEGIN {
    numbers[1] = "one"
    numbers[2] = "two"
    numbers[3] = "three"
    numbers[4] = "four"
    numbers[5] = "five"
    numbers[6] = "six"
    numbers[7] = "seven"
    numbers[8] = "eight"
    numbers[9] = "nine"
}
{
    line = ""
    for (i = 1; i <= length($1); i++) {
        for (j = 1; j <= length(numbers); j++) {
            s = substr($1, i, length(numbers[j]))
            if (numbers[j] == s) {
                line = line j
                i += length(numbers[j])
            }
        }
        char = substr($1, i, 1)
        if (char ~ "[0-9]") {
            line = line char
        }
    }
    sum += substr(line,1,1) substr(line,length(line),1)
}
END {
    print sum
}
