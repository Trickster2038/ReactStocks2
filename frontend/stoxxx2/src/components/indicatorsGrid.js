import { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { withTranslation } from 'react-i18next';

class IndicatorsGrid extends Component {

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

        let url = process.env.REACT_APP_API_GATEWAY + "info/"
            + this.props.symb + "?tag=" + this.props.tag
            + "&interval=" + this.props.interval

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.indicators)
                    this.setState({
                        isLoaded: true,
                        items: result.indicators,
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

    // cellClickHandler(params) {
    //     const url = '/stats?symb=' + params.row.symbol
    //         + '&exchange=' + params.row.exchange
    //         + '&tag=' + params.row.tag
    //         + '&back=' + params.row.pair_type
    //     window.location.replace(url);
    // }

    render() {
        console.log("render indicators", this.state.items)
        const { error, error_message, isLoaded, items1 } = this.state;
        var items = Object.values(this.state.items)
        // console.log(Object.values(items)[1])
        if (error) {
            return <div class="searchlist-result">
                {/* <p>{this.props.t("error")}: {error_message}</p> */}
                <p>{this.props.t("empty1")}</p>
            </div>;
        } else if (!isLoaded) {
            return <div class="searchlist-result">
                <p>{this.props.t("load")}...</p>
            </div>;
        } else {
            for(let i in items){
                items[i].id = i
            }
            const columns = [
                { field: 'indicator', headerName: this.props.t("indicator"), flex: 1 },
                { field: 'signal', headerName: this.props.t("signal"), flex: 1 },
                { field: 'value', headerName: this.props.t("value"), flex: 1 },
            ]

            if (items.length > 0) {
                return (
                    <div id="datagrid" class="searchlist-result" style={{
                        margin: 'auto',
                        marginTop: 16, height: (items.length + 2) * 52
                    }}>
                        <DataGrid
                            rows={items}
                            columns={columns}
                            pageSize={12}
                        // onCellClick={this.cellClickHandler}
                        />
                    </div>
                );
            } else {
                return (
                    <div class="searchlist-result">
                        <p>{this.props.t("empty2")}</p>
                    </div>
                );
            }
        }
    }

}

export default withTranslation()(IndicatorsGrid);