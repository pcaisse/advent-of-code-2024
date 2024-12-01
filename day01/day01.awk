{ l[NR] = $1; r[NR] = $2 }
END {
    asort(l, ls)
    asort(r, rs)
    for (i = 1; i <= FNR; i++) {
        diff = ls[i] - rs[i]
        ret += (diff < 0 ? diff * -1 : diff)
    }
    print ret
}

