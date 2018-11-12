#include <stdio.h>
#include <string.h>
#include <time.h>

/* s, t: two strings; ls, lt: their respective length */
int levenshtein(const char *s, int ls, const char *t, int lt)
{
    int a, b, c;

    /* if either string is empty, difference is inserting all chars
     * from the other
     */
    if (!ls) return lt;
    if (!lt) return ls;

    /* if last letters are the same, the difference is whatever is
     * required to edit the rest of the strings
     */
    if (s[ls - 1] == t[lt - 1])
            return levenshtein(s, ls - 1, t, lt - 1);

    /* else try:
     *      changing last letter of s to that of t; or
     *      remove last letter of s; or
     *      remove last letter of t,
     * any of which is 1 edit plus editing the rest of the strings
     */
    a = levenshtein(s, ls - 1, t, lt - 1);
    b = levenshtein(s, ls,     t, lt - 1);
    c = levenshtein(s, ls - 1, t, lt    );

    if (a > b) a = b;
    if (a > c) a = c;

    return a + 1;
}

int main()
{
    const char *s1 = "rosettacode";
    const char *s2 = "raisethysword";

    clock_t begin = clock();
    int dist = levenshtein(s1, strlen(s1), s2, strlen(s2));
    clock_t end = clock();
    double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;

    printf("distance between `%s' and `%s': %d\n", s1, s2,
            levenshtein(s1, strlen(s1), s2, strlen(s2)));
    printf("time spent: %f\n", time_spent);

    return 0;
}
