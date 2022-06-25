import { useTranslation } from "react-i18next";

function SearchList(props) {
    const { t } = useTranslation();

    return (
        <div>
            {props.query}
        </div>
    )
}
export default SearchList;