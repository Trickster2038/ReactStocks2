import { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { withTranslation } from 'react-i18next';

class SearchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            error_message: "",
            isLoaded: false,
            items: []
        };
    }

    call_api() {

        let url = process.env.REACT_APP_API_GATEWAY + "search/" +
            this.props.query + "?type=" + this.props.category

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.stocks,
                        error: false
                    });
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (err) => {
                    this.setState({
                        isLoaded: true,
                        error_message: err.message,
                        error: true,
                    });
                }
            )
    }

    componentDidMount() {
        this.call_api()
    }

    componentDidUpdate(prevProps) {
        if (this.props.query !== prevProps.query) {
            this.call_api()
        }
    }

    cellClickHandler(params) {
        const url = '/stats?symb=' + params.row.symbol
            + '&exchange=' + params.row.exchange
            + '&tag=' + params.row.tag
            + '&back=' + params.row.pair_type
        window.location.replace(url);
    }

    render() {
        const { error, error_message, isLoaded, items } = this.state;
        if (error) {
            return <div class="searchlist-result">
                {/* <p>{this.props.t("error")}: {error_message}</p> */}
                <p>{this.props.t("empty")}</p>
            </div>;
        } else if (!isLoaded) {
            return <div class="searchlist-result">
                <p>{this.props.t("load")}...</p>
            </div>;
        } else {
            {
                items.map(item => (
                    item.id = item.id_
                ))
            }
            const columns = [
                { field: 'name', headerName: this.props.t("name"), flex: 1 },
                { field: 'symbol', headerName: this.props.t("symbol"), flex: 1 },
                { field: 'exchange', headerName: this.props.t("exchange"), flex: 1 }, ,
                { field: 'country', headerName: this.props.t("country"), flex: 1 }
            ]

            if (items.length > 0) {
                return (
                    <div id="datagrid" class="searchlist-result" style={{
                        margin: 'auto',
                        marginTop: 16, height: window.innerHeight*0.75 //(items.length + 1) * 56
                    }}>
                        <DataGrid
                            rows={items}
                            columns={columns}
                            pageSize={Math.round(window.innerHeight*0.75 / 52)-2}
                            onCellClick={this.cellClickHandler}
                        />
                    </div>
                );
            } else {
                return (
                    <div class="searchlist-result">
                        <p>{this.props.t("empty")}</p>
                    </div>
                );
            }
        }
    }

}

export default withTranslation()(SearchList);