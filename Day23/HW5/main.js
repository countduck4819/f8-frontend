var categories = [
    {
        id: 1,
        name: "Chuyên mục 1",
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        children: [
            {
                id: 4,
                name: "Chuyên mục 2.1",
            },
            {
                id: 5,
                name: "Chuyên mục 2.2",
                children: [
                    {
                        id: 10,
                        name: "Chuyên mục 2.2.1",
                    },
                    {
                        id: 11,
                        name: "Chuyên mục 2.2.2",
                    },
                    {
                        id: 12,
                        name: "Chuyên mục 2.2.3",
                    },
                ],
            },
            {
                id: 6,
                name: "Chuyên mục 2.3",
            },
        ],
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        children: [
            {
                id: 7,
                name: "Chuyên mục 3.1",
            },
            {
                id: 8,
                name: "Chuyên mục 3.2",
            },
            {
                id: 9,
                name: "Chuyên mục 3.3",
            },
        ],
    },
];
Object.prototype.valueOf = function () {
    return this.name;
};
var result = [];
var kitu = "";
var duyet = function (categories, kitu) {
    for (var value of categories) {
        console.log(value);
        result[result.length] =
            `<option value='${value}'>` + kitu + value + "</option>";
        if (value.children && value.children.length) {
            duyet(value.children, kitu + "--|");
        }
    }
};
duyet(categories, kitu);
var kq =
    "<select name='chon' id=''><option value='Chọn chuyên mục' disabled>Chọn chuyên mục</option>";
kq += result.join(" ") + "</select>";
document.write(kq);
