
export const ProductDetail = function ({data}) {
    const {id} = data;
    return `<h1>Chi tiết sản phẩm: ${id}</h1>
    <button class="back" ">Back</button>`;
};
