{
    i = 1
    increasing = $1 - $2 > 0 ? 1 : 0
    print $0, increasing
    while (d = $i - $(i + 1)) {
        print i, d
        if ((increasing && d < 0) || (!increasing && d > 0)) {
            print "switching increasing/decreasing!"
            break
        }
        if (increasing && (d > 3 || d < 1)) {
            printf "increased too much! d = %d\n", d
            break
        }
        if (!increasing && (d < -3 || d > -1)) {
            printf "decreased too much! d = %d\n", d
            break
        }
        if (i == NF - 1) {
            print "reached end without short circuiting! add 1"
            r++
            break
        }
        i++
    }
}
END { print r }
