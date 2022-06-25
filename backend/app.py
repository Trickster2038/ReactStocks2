from flask import Flask
import investpy
import json
from flask_cors import CORS, cross_origin
from flask import request

app = Flask(__name__)
cors = CORS(app)

# "indices, stocks, etfs, funds, commodities, 
# currencies, cryptos, bonds, certificates, fxfutures"

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
            x.country = x.country or " - "
            country = x.country.split()
            x.country = ""
            for c in country:
                x.country += c[0].upper() + c[1:] + " "
            if x.exchange == "":
                x.exchange = " - "
            a.append(json.loads(str(x)))
    json1 = {'stocks':a}
    return json1

# http://127.0.0.1:5000/info/dia?tag=/etfs/diamonds-trust
@app.route("/info/<symbol>")
@cross_origin()
def stats(symbol):
    tag = request.args.get('tag')
    results = investpy.search_quotes(text=symbol, n_results=10)
    search_result = ""
    for x in results:
        if x.tag == tag:
            x.country = x.country or " - "
            country = x.country.split() 
            x.country = ""
            for c in country:
                x.country += c[0].upper() + c[1:] + " "
            if x.exchange == "":
                x.exchange = " - "
            search_result = x
            break
    info = json.loads(str(search_result))
    history = json.loads(str(search_result.retrieve_recent_data().to_json()))
    return {'info': info, 'history': history}

if __name__ == '__main__':
    app.run(debug=True)
