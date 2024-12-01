{ l[NR] = $1 }
{ r[$2]++ }
END {
    for (i=1; i<=NR; i++) {
        ret += l[i] * r[l[i]]
    }
    print ret
}
