function count_xmas(i, j,   k, c) {
    up = up_left = up_right = right = left = down = down_left = down_right = "X"
    for(k=1; k<=3; k++) {
        up = up substr(a[i - k], j, 1)
        up_left = up_left substr(a[i - k], j - k, 1)
        up_right = up_right substr(a[i - k], j + k, 1)
        right = right substr(a[i], j + k, 1)
        left = left substr(a[i], j - k, 1)
        down = down substr(a[i + k], j, 1)
        down_left = down_left substr(a[i + k], j - k, 1)
        down_right = down_right substr(a[i + k], j + k, 1)
    }
    print up, up_left, up_right, right, left, down, down_left, down_right
    if (up == word) c++
    if (up_left == word) c++
    if (up_right == word) c++
    if (right == word) c++
    if (left == word) c++
    if (down == word) c++
    if (down_left == word) c++
    if (down_right == word) c++
    return c
}

BEGIN { FS = ""; word = "XMAS" }
{ a[NR] = $0 }
END {
    for(i=1; i<=NR; i++) {
        for (j=1; j<=NF; j++) {
            if (substr(a[i], j, 1) == "X") {
                # print i, j, r
                r += count_xmas(i, j)
            }
        }
    }
    print r
}

