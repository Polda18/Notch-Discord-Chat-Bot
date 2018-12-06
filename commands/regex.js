module.exports.run = async(client, message, args) => {
    // This is not actually a command, just a placeholder for help page

    return; // do not disturb me
}

module.exports.helper = {
    name: "regex",
    info: {
        quick: "Not a command. Run `help regex` command to show informations about regular expressions",
        detail: {
            desc: "This is not a command, but a help page for brief regular expression syntax. Arguments are not actually arguments, but in fact syntax elements of regular expressions. If you run this command, it does nothing. For a complete definition of regular expressions syntax, click [Regular Expressions Guideline](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) link.",
            args: {
                group: {
                    info: "Group is used to split expression into grouped pieces. The group boundaries are built using parentesis: `(` and `)`. For example, `(abc)` creates group with content `abc`. This is also a baseline for switch and is used to group more characters into single quantifier.",
                    optional: true
                },
                switch: {
                    info: "Switch is based on groups. It simply switches between various groups. Switch operator is `|`. For example `(abc|xyz) makes regular expression to think of eighter `abc` or `xyz`. Never both at the same time",
                    optional: true
                },
                conditions: {
                    info: "Conditions are quantifiers. Those quantifiers define how many times the expressed group should appear in searched string. Those are: `?`, `+`, `*`. `?` defines a single or none apperance of quantified group, `+` counts for at least one appearance and `*` for any number of appearances, including zero. More specific quantifier could be made using curly brackets: `{` and `}`. It takes two arguments: minimum count and maximum count. It's always divided by a comma: `,`. `{2,3}` will match 2times and 3times repeated expression piece. To leave one side opened, just omit corresponding number. However, you have to type in the comma. `{,9}` will open from minimum, `{9,}` will open from maximum. If you want just an exact number, there is a shortcut: `{2}` will match exactly two times repeated expression piece.",
                    optional: true
                },
                charlist: {
                    info: "Characters list is used to list group of characters to match on a single place. The list is in form of string of matched characters, enclosed by square brackets: `[`, `]`. E.g. `[abcdefg]` will match one of the letters from `a` to `g`. There is a shortcut to list characters range, using dash (`-`) character: `[a-z]` will match all small letters from `a` to `z`. Those ranges can be chained: `[a-zA-Z0-9]` will match all alphanumeric characters. Use `^` before the list to negotiate the match (so it will exclude all matching characters from the match). A special character `.` is for every single printable character. If you need to match specifically dot, you have to escape it: `\\`",
                    optional: true
                },
                escapes: {
                    info: "Escape characters. Those are used to write special characters otherwise unwritteable. An escape prefix is `\\` This makes it to escape all the special characters used for regex syntax. It also escapes itself: `\\\\` matches `\\`. Some special characters can be escaped easily: `\\s` - all white space characters (new line feed, space, tabulator). `\\t` - tabulator specifically.",
                    optional: true
                }
            }
        }
    }
}