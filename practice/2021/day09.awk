#!/usr/bin/awk -f

function is_lowest_point(a, i, j) {
    current = substr(a[i], j, 1)
    d = current + 1
    above = i > 1 ? substr(a[i - 1], j, 1) : d
    below = i < n ? substr(a[i + 1], j, 1) : d
    left = j > 1 ? substr(a[i], j - 1, 1) : d
    right = j < nf ? substr(a[i], j + 1, 1) : d
    # print i, j, current, above, below, left, right
    if (current < above && current < below && current < left && current < right) {
        # print "lowest point!"
        return 1
    }
    return 0
}

BEGIN { FS = "" }
NR==FNR { a[NR] = $0; n=NR; nf=NF; next }
END {
    for(i=1; i<=n; i++) {
        for (j=1; j<=nf; j++) {
            if (is_lowest_point(a, i, j)) r += current + 1
        }
    }
    print r
}
