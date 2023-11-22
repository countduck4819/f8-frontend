import "../Assets/Style.scss"
import "bootstrap/dist/css/bootstrap.min.css"

export const DefaultLayout = () => {
    return `
        <header class="mb-3">
            <div class="container">
                <h1><a href="/">HEADER</a></h1>
            </div>
        </header>
        <main>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <h2>Menu</h2>
                        <ul>
                            <li><a href="/" data-router>Trang chủ</a></li>
                            <li><a href="/gioi-thieu" data-router>Giới thiệu</a></li>
                            <li><a href="/san-pham" data-router>Sản phẩm</a></li>
                        </ul>
                    </div>
                    <div class="col-9">
                        {body}
                    </div>
                </div>
            </div>
        </main>
        <footer class="mt-3">
            <div class="container">
                <h1>FOOTER</h1>
            </div>
        </footer>
    `
}