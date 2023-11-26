export const ProductDetail = ({data}) => {
    const {id} = data
    return `
        <h1>Chi tiết sản phẩm: ${id}</h1>
        <button class="btn btn-primary" onclick="navigate('san-pham')">Back</button>
    `
}