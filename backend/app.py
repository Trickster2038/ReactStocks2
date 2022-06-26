from flask import Flask
import investpy
import json
from flask_cors import CORS, cross_origin
from flask import request

app = Flask(__name__)
cors = CORS(app)

# "indices, stocks, etfs, funds, commodities, 
# currencies, cryptos, bonds, certificates, fxfutures"

def serve_main_data(x):
    x.country = x.country or " - "
    country = x.country.split()
    x.country = ""
    for c in country:
        x.country += c[0].upper() + c[1:] + " "
    if x.exchange == "":
        x.exchange = " - "
    return x


# http://127.0.0.1:5000/search/a?type=etfs
@app.route("/search/<name>")
@cross_origin()
def search(name):
    asset_type = request.args.get('type')
    ok = True
    try:
        search_result = investpy.search_quotes(text=name, products=[asset_type], n_results=50)
    except Exception as e:
        print(e)
        ok = False
    a = []
    if ok:
        for x in search_result:
            x = serve_main_data(x)
            a.append(json.loads(str(x)))
    json1 = {'stocks':a}
    return json1

# http://127.0.0.1:5000/info/dia?tag=/etfs/diamonds-trust&interval=daily
@app.route("/info/<symbol>")
@cross_origin()
def stats(symbol):
    tag = request.args.get('tag')
    interval = request.args.get('interval')
    results = investpy.search_quotes(text=symbol, n_results=10)
    search_result = ""
    for x in results:
        if x.tag == tag:
            x = serve_main_data(x)
            search_result = x
            break
    info = json.loads(str(search_result))
    indicators = json.loads(str(search_result
        .retrieve_technical_indicators(interval=interval).T.to_json()))
    app.logger.info(json.dumps(indicators, indent=2))
    return {'info': info, 'indicators': indicators}

if __name__ == '__main__':
    app.run(debug=True)
