window.LPDailyVerses=[
    {
        "reference":  "Psalms 119:105",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Psalm%20119%3A105?translation=web",
        "text":  "Your word is a lamp to my feet,\nand a light for my path."
    },
    {
        "reference":  "Proverbs 3:5-6",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Proverbs%203%3A5-6?translation=web",
        "text":  "Trust in Yahweh with all your heart,\nand don’t lean on your own understanding.\nIn all your ways acknowledge him,\nand he will make your paths straight."
    },
    {
        "reference":  "Psalms 23:1",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Psalm%2023%3A1?translation=web",
        "text":  "Yahweh is my shepherd:\nI shall lack nothing."
    },
    {
        "reference":  "Psalms 46:10",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Psalm%2046%3A10?translation=web",
        "text":  "“Be still, and know that I am God.\nI will be exalted among the nations.\nI will be exalted in the earth.”"
    },
    {
        "reference":  "Matthew 5:14",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Matthew%205%3A14?translation=web",
        "text":  "You are the light of the world. A city located on a hill can’t be hidden."
    },
    {
        "reference":  "Matthew 5:16",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Matthew%205%3A16?translation=web",
        "text":  "Even so, let your light shine before men; that they may see your good works, and glorify your Father who is in heaven."
    },
    {
        "reference":  "2 Corinthians 5:7",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/2%20Corinthians%205%3A7?translation=web",
        "text":  "for we walk by faith, not by sight."
    },
    {
        "reference":  "Philippians 4:13",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Philippians%204%3A13?translation=web",
        "text":  "I can do all things through Christ, who strengthens me."
    },
    {
        "reference":  "Psalms 121:1-2",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Psalm%20121%3A1-2?translation=web",
        "text":  "I will lift up my eyes to the hills.\nWhere does my help come from?\nMy help comes from Yahweh,\nwho made heaven and earth."
    },
    {
        "reference":  "Isaiah 40:31",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Isaiah%2040%3A31?translation=web",
        "text":  "But those who wait for Yahweh will renew their strength.\nThey will mount up with wings like eagles.\nThey will run, and not be weary.\nThey will walk, and not faint."
    },
    {
        "reference":  "Joshua 1:9",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Joshua%201%3A9?translation=web",
        "text":  "Haven’t I commanded you? Be strong and courageous. Don’t be afraid. Don’t be dismayed, for Yahweh your God is with you wherever you go.”"
    },
    {
        "reference":  "Romans 12:12",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Romans%2012%3A12?translation=web",
        "text":  "rejoicing in hope; enduring in troubles; continuing steadfastly in prayer;"
    },
    {
        "reference":  "1 Corinthians 16:14",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/1%20Corinthians%2016%3A14?translation=web",
        "text":  "Let all that you do be done in love."
    },
    {
        "reference":  "Numbers 6:24-26",
        "translation":  "World English Bible",
        "source":  "https://bible-api.com/Numbers%206%3A24-26?translation=web",
        "text":  "‘Yahweh bless you, and keep you.\nYahweh make his face to shine on you,\nand be gracious to you.\nYahweh lift up his face toward you,\nand give you peace.’"
    }
];
window.LPVerseForDate=(date=new Date())=>{const day=Math.floor(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000),verses=window.LPDailyVerses;return verses[((day%verses.length)+verses.length)%verses.length];};
