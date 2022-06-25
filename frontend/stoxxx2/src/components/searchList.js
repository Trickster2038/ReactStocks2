import { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';

class SearchList extends Component {

    static exhanges_const = ["rr", "nyse"];

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
        let exchanges = SearchList.exhanges_const
        let exchanges_params = ""
        for (let i in exchanges) {
            exchanges_params += "&exchanges=" + exchanges[i]
        }

        let url = process.env.REACT_APP_API_GATEWAY + "search/" +
            this.props.query + "?type=" + this.props.category + exchanges_params

        // console.log(url)
        fetch(url)
            // + this.props.asset_name())
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.stocks,
                        error: false
                    });
                    console.log("api search")
                    console.log(result)
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
            console.log("search upd")
            this.call_api()
        }
    }

    cellClickHandler(params) {
        const name = params.row.name
        const url = '/stats?symbol=' + params.row.symbol + '&country=' + params.row.country
        console.log(url)
        window.location.replace(url);
    }

    render() {
        const { error, error_message, isLoaded, items } = this.state;
        if (error) {
            return <div>Ошибка: {error_message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            {
                items.map(item => (
                    item.id = item.id_
                ))
            }
            const columns = [
                { field: 'name', headerName: 'Name', width: 300 },
                { field: 'symbol', headerName: 'Symbol', width: 100 },
                { field: 'exchange', headerName: 'Exchange', width: 100 },
                { field: 'pair_type', headerName: 'Type', width: 100 },
                { field: 'country', headerName: 'Country', width: 200 }
            ]
            // this.call_api()
            return (
                <div style={{ margin: 'auto', height: 700, width: '70%' }}>
                    {/* {console.log('render grid ' + this.props.query)} */}
                    <DataGrid
                        rows={items}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        onCellClick={this.cellClickHandler}
                    />
                </div>
            );
        }
    }

    // render() {

    //     return (
    //         <div>
    //             {process.env.REACT_APP_API_GATEWAY}
    //         </div>
    //     )
    // }
}

export default SearchList;