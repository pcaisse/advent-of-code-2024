BEGIN { RS="do\\(\\)|don't\\(\\)"}
RT == "do()" { skip_record[NR + 1] = 0 }
RT == "don't()" { skip_record[NR + 1] = 1 }
skip_record[NR] == 0 {
    while (match($0, /mul\(([0-9]{1,3}),([0-9]{1,3})\)/, a)) {
        r += a[1] * a[2]
        $0=substr($0, RSTART+RLENGTH)
    }
}
END { print r }
