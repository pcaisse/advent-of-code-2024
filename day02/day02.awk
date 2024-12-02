function is_safe(a) {
    # print length(a)
    # print a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]
    i = 1
    decreasing = a[1] - a[2] > 0 ? 1 : 0
    printf "decreasing = %s\n", decreasing
    while (d = a[i] - a[i + 1]) {
        printf "d = %s\n", d
        if ((decreasing && d < 0) || (!decreasing && d > 0)) {
            print "changed increasing/decreasing!"
            break
        }
        if (decreasing && (d > 3 || d < 1)) {
            print "decreased too much"
            break
        }
        if (!decreasing && (d < -3 || d > -1)) {
            print "increased too much"
            break
        }
        if (i == length(a) - 1) {
            print "safe"
            return 1
            break
        }
        i++
    }
    return 0
}

{
    split($0, line, " ")
    split("", c)
    for (i=1; i<=NF; i++) {
        for (j in line) {
            if (j != i) {
                c[i][j] = line[j]
            }
        }
    }
    y = 0
    split("", new_c)
    for (i in c) {
        j = 1
        for (key in c[i]) {
            new_c[i][j++] = c[i][key]
        }
        if (is_safe(new_c[i])) {
            y = 1
            break
        }
    }
    if (is_safe(line)) {
        y = 1
    }
    if (y) {
        r++
    }
}
END { print r }
