from flask import Flask, render_template, request, jsonify, send_from_directory
import finnhub
from datetime import *
from dateutil.relativedelta import relativedelta
import requests

app = Flask(__name__, static_url_path='', static_folder="static")

finnhub_client = finnhub.Client(
    api_key="cmr1351r01ql2lmtd0ngcmr1351r01ql2lmtd0o0")


@app.route('/')
def search_bar():
    return send_from_directory("static", 'page1.html')


@app.route('/company_summary', methods=['GET'])
def process_input():
    stockLabel = request.get_data(
        as_text=True) or request.args.get('symbol')

    response = finnhub_client.company_profile2(
        symbol=stockLabel) or request.args.get('stockLabel')
    if (response):

        response_dict = {
            "logo": response.get('logo'),
            "name": response.get('name'),
            "symbol": response.get('ticker'),
            "exchange": response.get('exchange'),
            "ipo": response.get('ipo'),
            "category": response.get('finnhubIndustry')
        }

        return response_dict
    return "None"


@app.route('/stock_summary', methods=['GET'])
def stock_summary():
    stockLabel = request.get_data(
        as_text=True) or request.args.get('symbol')
    response = finnhub_client.quote(symbol=stockLabel)
    recommendation_trends_response = finnhub_client.recommendation_trends(
        symbol=stockLabel)

    response_dict = {
        "symbol": stockLabel.upper(),
        "trading_day": datetime.utcfromtimestamp(response.get('t')).strftime('%d %B, %Y'),
        "previous_closing_price": response.get('pc'),
        "opening_price": response.get('o'),
        "high_price": response.get('h'),
        "low_price": response.get('l'),
        "change": response.get('d'),
        "change_percent": response.get('dp'),
        "strong_sell": recommendation_trends_response[0].get('strongSell'),
        "sell": recommendation_trends_response[0].get('sell'),
        "hold": recommendation_trends_response[0].get('hold'),
        "buy": recommendation_trends_response[0].get('buy'),
        "strong_buy": recommendation_trends_response[0].get('strongBuy'),
    }

    return response_dict


@app.route('/charts_summary', methods=['GET'])
def charts_summary():
    stockLabel = request.get_data(
        as_text=True).upper() or request.args.get('symbol').upper()
    prior_date = str(date.today()+relativedelta(months=-6, days=-1))
    current_date = str(date.today())

    url = f"https://api.polygon.io/v2/aggs/ticker/{stockLabel}/range/1/day/{prior_date}/{current_date}?adjusted=true&sort=asc&apiKey=V_58CM6r1pqN8GSXt0f_By4FG27NdnCP"
    response = requests.get(url)
    response = response.json().get('results')

    volume_list = []
    stock_list = []

    for r in response:
        response_dict_volume = [
            r.get('t'),
            r.get('v')
        ]
        volume_list.append(response_dict_volume)
        response_dict_stock_list = [
            r.get('t'),
            r.get('c')
        ]
        stock_list.append(response_dict_stock_list)

    response_data = {
        'volume_list': volume_list,
        'stock_list': stock_list
    }
    return response_data


@app.route('/news_summary', methods=['GET'])
def news_summary():
    stockLabel = request.get_data(
        as_text=True) or request.args.get('symbol')

    response_list = finnhub_client.company_news(
        symbol=stockLabel, _from=date.today()+relativedelta(months=-1), to=date.today())

    response_data = []

    for response in response_list:
        image = response.get("image")
        headline = response.get("headline")
        datetime_value = response.get('datetime')
        url = response.get("url")

        if image and headline and datetime_value and url:
            response_dict = {
                "image": image,
                "headline": headline,
                "datetime": datetime.utcfromtimestamp(datetime_value).strftime('%d %B, %Y'),
                "url": url,
            }
            response_data.append(response_dict)

    return response_data
