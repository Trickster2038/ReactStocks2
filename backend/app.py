from flask import Flask
import investpy
import json
from flask_cors import CORS, cross_origin
from flask import request

app = Flask(__name__)
cors = CORS(app)

# "indices, stocks, etfs, funds, commodities, 
# currencies, cryptos, bonds, certificates, fxfutures"

# http://127.0.0.1:5000/search/a?type=etfs&exchanges=rr&exchanges=nyse
@app.route("/search/<name>")
@cross_origin()
def search(name):
    asset_type = request.args.get('type')
    exchanges = request.args.getlist('exchanges')
    app.logger.info("exch-s: ", str(exchanges))
    ok = True
    try:
        search_result = investpy.search_quotes(text=name, products=[asset_type], n_results=50)
    except Exception as e:
        print(e)
        ok = False
    a = []
    if ok:
        for x in search_result:
            if x.exchange.lower() in exchanges:
                a.append(json.loads(str(x)))
    json1 = {'stocks':a}
    # return json.dumps(json1, indent=4)
    return json1

@app.route("/info/<symbol>")
@cross_origin()
def stats(symbol):
    country = request.args.get('country')
    search_result = investpy.search_quotes(text=symbol, countries=[country], n_results=1)
    info = json.loads(str(search_result))
    history = json.loads(str(search_result.retrieve_recent_data().to_json()))
    return {'info': info, 'history': history}

if __name__ == '__main__':
    app.run(debug=True)