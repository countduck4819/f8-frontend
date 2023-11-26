import imgError from "../../public/error404.png";
import "../Assets/Error.scss"
export const Error = () => {
    return `
        <div class="image">
            <img src="${imgError}" alt="error"/>
        </div>
    `
}