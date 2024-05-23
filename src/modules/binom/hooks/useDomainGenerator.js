
let leftPart = [
    "butter",
    "cake",
    "ice",
    "gold",
    "music",
    "mine",
    "food",
    "blanket",
    "bag",
    "capital",
    "cry",
    "fit",
    "stock",
    "economics",
    "sugar",
    "income",
    "coffe",
    "tea",
    "milk"
];
let rightPart = [
    "me",
    "take",
    "work",
    "miu",
    "tech",
    "got",
    "give",
    "see",
    "earn",
    "simple",
    "fast",
    "buisness",
    "time"
]

let tld = [
    "life",
    "directory",
    "store",
    "shop",
    "xyz",
    "nl",
    "pics",
    "homes",
    "sbs",
    "cfd",
    "world",
    "icu",
    "pro",
    "top",
    "cyou"
]

function* generate_new_domain() {
    let targetLeftPart = Math.floor(Math.random() * leftPart.length);
    let targetRightPart = Math.floor(Math.random() * rightPart.length);
    let targetTLD = Math.floor(Math.random() * tld.length);

    let new_domain = leftPart[targetLeftPart] + (Math.random() > 0.5 ? "-" : "") + rightPart[targetRightPart] + "." + tld[targetTLD];

    return new_domain;
}

export const useDomainGenerator = () => {

    function generate_from_num(num_to_generate){
        let new_array = Array.from(
            Array(num_to_generate),
            () => generate_new_domain().next().value
        )
        return new_array;
    }

    return generate_from_num
}