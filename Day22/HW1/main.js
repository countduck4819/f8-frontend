// document.write('Chuyển đổi mảng 1 chiều thành dạng lồng (nested)');

var categories = [
    {
      id: 1,
      name: "Chuyên mục 1",
      parent: 0,
    },
    {
      id: 2,
      name: "Chuyên mục 2",
      parent: 0,
    },
    {
      id: 3,
      name: "Chuyên mục 3",
      parent: 0,
    },
    {
      id: 4,
      name: "Chuyên mục 2.1",
      parent: 2,
    },
    {
      id: 5,
      name: "Chuyên mục 2.2",
      parent: 2,
    },
    {
      id: 6,
      name: "Chuyên mục 2.3",
      parent: 2,
    },
    {
      id: 7,
      name: "Chuyên mục 3.1",
      parent: 3,
    },
    {
      id: 8,
      name: "Chuyên mục 3.2",
      parent: 3,
    },
    {
      id: 9,
      name: "Chuyên mục 3.3",
      parent: 3,
    },
    {
      id: 10,
      name: "Chuyên mục 2.2.1",
      parent: 5,
    },
    {
      id: 11,
      name: "Chuyên mục 2.2.2",
      parent: 5,
    },
  ];


function Topic(id, name, children) {
    this.id = id;
    this.name = name;
    if (children.length !== 0) {
        this.children = children;
    }
}

var len = categories.length;

var th = function(parent,listchild,categories,index) {
    if (index >= len) {
        return 0;
    }
    else {
        if (parent === categories[index].parent) {
            var newA = [];
            th(categories[index].id,newA,categories,0);
            categories[index] = new Topic(categories[index].id,categories[index].name,newA);
            listchild.push(categories[index]);
        }
        th(parent,listchild,categories,++index);
    }
}

var newArray = [];
th(0,newArray,categories,0)

console.log(newArray)




